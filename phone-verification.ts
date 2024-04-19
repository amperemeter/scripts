import { inject, injectable } from "tsyringe";
import { AxiosError } from "axios";
import { IHttpService } from "frontend-core";
import moment, { Moment } from "moment";
import { container } from "@/profile/serviceContainer";

@injectable()
export class PhoneVerification {
  private readonly timeMessage = "Запросить звонок можно не ранее, чем через ";

  private readonly phoneSuccessMessage: string =
    "В течение нескольких секунд на Ваш телефон поступит звонок-сброс с уникального номера. " +
    "Вам нужно ввести последние 4 цифры этого номера.<br>" +
    "<strong>Пример: 3344</strong";

  constructor(
    @inject("IHttpService")
    private readonly httpService: IHttpService,
  ) {}

  public loaded(): void {
    document.addEventListener("DOMContentLoaded", () => {
      this.blockButton();

      let phone: any = "";

      $(".confirm-phone-button").on("click", async () => {
        phone = $("#phone-number").val();
        phone = phone.replace(/\D/g, "");
        await this.confirmPhone(phone);
      });

      $(".send-code-button").on("click", async () => {
        const code = $("#phone-code").val();
        await this.sendCode(phone, code);
      });

      $("#phone-number").on("keypress", async () => {
        $(".not_confirmed")?.show();
        $(".confirmed")?.hide();
        setTimeout(() => this.blockButton(), 300);
      });
    });
  }

  public updateCounter(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
  }

  public showMessage(elClass: string, message: string) {
    $("#verifed-phone-block").attr("class", `alert ${elClass}`);
    $("#verifed-phone-message").html(message);
  }

  public hideMessage() {
    $("#verifed-phone-block").attr("class", "hide");
    $("#verifed-phone-message").html("");
  }

  public async confirmPhone(phone: string): Promise<void> {
    const button = $(".confirm-phone-button");
    $(button).attr("disabled", "disabled");
    this.hideMessage();

    if (phone) {
      await this.httpService.api
        .post("phone-verify", { phone })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("confirmation_time", new Date().toString());
            $(".send-code-group").show();
            this.showMessage("alert-success", this.phoneSuccessMessage);
            this.blockButton();
          } else {
            $(button).removeAttr("disabled");
            this.showMessage(
              "alert-danger",
              res.data.data.message || "Неизвестная ошибка при отправке запроса на подтверждение.",
            );
          }
        })
        .catch((e: AxiosError<{ detail: string }>) => {
          $(button).removeAttr("disabled");
          this.showMessage(
            "alert-danger",
            e.response?.data.detail || "Неизвестная ошибка при отправке запроса на подтверждение.",
          );
        });
    }
  }

  public async sendCode(phone: any, code: any): Promise<void> {
    const button = $(".send-code-button");
    $(button).attr("disabled", "disabled");
    this.hideMessage();

    await this.httpService.api
      .post("phone-check", { phone, code })
      .then((res) => {
        if (res.data.success) {
          $('[name="phone_token"]').val(res.data.data.token);
          setTimeout(() => $(".profile-form").trigger("submit"), 1000);
        } else {
          $(button).removeAttr("disabled");
          this.showMessage("alert-danger", res.data.data.message || "Неизвестная ошибка при отправке кода.");
        }
      })
      .catch((e: AxiosError<{ detail: string }>) => {
        $(button).removeAttr("disabled");
        this.showMessage("alert-danger", e.response?.data.detail || "Неизвестная ошибка при отправке кода.");
      });
  }

  public blockButton(): void {
    const phonePattern: RegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const phone = $("#phone-number");
    const button = $(".confirm-phone-button");

    const confirmationTime: string | null = localStorage.getItem("confirmation_time");
    const notConfirmed = $(".not_confirmed");

    if ($(notConfirmed)) {
      if ($(notConfirmed).css("display") === "none") {
        return;
      }
    }

    if (confirmationTime) {
      const callTimer = $("#call-timer");
      const date: Moment = moment();
      let duration: number = date.diff(new Date(confirmationTime), "seconds");

      if (duration < 60 && duration >= 0) {
        $(phone).attr("readonly", "readonly");
        $(button).attr("disabled", "disabled");

        if (!$(callTimer).text()) {
          $(callTimer).text(this.timeMessage).append("<span></span>");
        }

        const getMessage = () => $("#call-timer span").text(`00:${this.updateCounter(60 - ++duration)}`);
        getMessage();
        const interval = setInterval(() => getMessage(), 1000);

        setTimeout(
          () => {
            localStorage.removeItem("confirmation_time");
            $(phone).removeAttr("readonly");
            $(callTimer).text("");
            this.hideMessage();

            if (phonePattern.test(<string>$(phone).val())) {
              $(button).removeAttr("disabled");
            }

            clearInterval(interval);
          },
          (60 - duration) * 1000,
        );
      }
    }
  }
}

const phoneVerificationService = container.resolve(PhoneVerification);

phoneVerificationService.loaded();
