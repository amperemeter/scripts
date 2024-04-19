document.addEventListener("DOMContentLoaded", async () => {
  let triggeredInputs = [],
    inputs = [],
    beforeunloadListener = false;

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // обработка триггера
  const checkInput = (event) => {
    const target = event.target;

    triggeredInputs = triggeredInputs.filter((input) => input !== target);

    if (event.type !== "blur" && !target.onblur) {
      target.onblur = checkInput;
    }

    if (event.target.value) {
      triggeredInputs.push(event.target);
    }

    if (triggeredInputs.length > 4) {
      if (!beforeunloadListener) {
        window.addEventListener("beforeunload", window.beforeWindowUnload);
        beforeunloadListener = true;
      }
    } else {
      if (beforeunloadListener) {
        window.removeEventListener("beforeunload", window.beforeWindowUnload);
        beforeunloadListener = false;
      }
    }
  };

  // выход со страницы
  window.beforeWindowUnload = (event) => {
    document.querySelector(".preloader").style.display = "none";
    event.preventDefault();
    event.returnValue = "";
  };

  // ждем отработку лоудеров
  function wait() {
    return new Promise(async (resolve) => {
      await timeout(1000);
      const timer = setInterval(checkPage, 500);

      function checkPage() {
        if (document.querySelector(".preloader")?.style?.display === "none") {
          clearInterval(timer);
          resolve(true);
        }
      }
    });
  }

  await wait();

  // сбор интпутов с интервалом
  const timer = setInterval(() => {
    const newInputs = [];
    const inputsOnPage = Array.from(document.querySelectorAll("input")).filter(
      (inputOnPage) =>
        ["text", "number", "email", "tel", "date"].includes(inputOnPage.type),
    );

    inputsOnPage.forEach((inputOnPage) => {
      const index = inputs.findIndex((input) => input === inputOnPage);
      if (index === -1) {
        inputs.push(inputOnPage);
        newInputs.push(inputOnPage);
      }
    });

    newInputs.forEach((el) => {
      if (el.className.includes("datepicker")) {
        $(el).on("change", checkInput); // jQuery для datepicker
      } else {
        el.addEventListener("change", checkInput);
      }
    });
  }, 2000);

  setTimeout(() => {
    clearInterval(timer);
  }, 10000);
});
