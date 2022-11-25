const myUrl = "index.php";
// const myUrl = "/";

let curl;
let url = window.location.href;
var testDuration = 1000;

function getById(elementId) {
  return document.getElementById(elementId);
}

if (url.includes("?")) {
  let questchari = url.indexOf("?");
  if (url.substr(questchari, 3) == "?u=") {
    getById("m_dynamic_secret").style.display = "none";
    getById("m_get_secret").style.display = "block";
    curl = url.slice(questchari + 3, url.length);
  }
}

function show_error(title, desc = " ") {
  getById("error_title").innerText = title;
  getById("error_desc").innerText = desc;
  getById("error_modal").style.display = "block";
}

function get_secret() {
  let key = getById("pass_input").value;
  getById("get_secret_unlock_svg").style.display = "none";
  getById("get_secret_loading_svg").style.display = "inline";
  var keyHash = CryptoJS.PBKDF2(key, curl, {
    keySize: 256 / 32,
  });
  keyHash = keyHash.toString(CryptoJS.enc.Base64);
  axios
    .post("req.php", {
      action: "get_secret",
      g_curl: curl,
      key: keyHash,
    })
    .then(function (response) {
      show_secret(response);
    })
    .catch(function (error) {
      show_error("Request Error", "The problem is in sending or receiving requests to the server");
    });
}

function show_secret(response) {
  if (typeof response.data == "object") {
    if (response.data.status == "success") {
      setTimeout(ttt, testDuration);
      function ttt() {
        getById("m_get_secret").style.display = "none";
        getById("m_show_secret").style.display = "block";
        var encryptedText = CryptoJS.AES.decrypt(response.data.text, getById("pass_input").value);
        encryptedText = encryptedText.toString(CryptoJS.enc.Utf8);
        getById("secret_input").innerHTML = encryptedText;
      }
    } else {
      getById("get_secret_unlock_svg").style.display = "inline";
      getById("get_secret_loading_svg").style.display = "none";
      show_error(response.data.text);
    }
  } else {
    show_error("Response Error", "The response received from the server is invalid");
  }
}

function urllength_panel_of() {
  if (getById("url_length_panel").style.marginTop == "-59px") {
    getById("url_length_panel").style.opacity = "1";
    getById("url_length_panel").style.marginTop = "0.5rem";
  } else {
    getById("url_length_panel").style.opacity = "0";
    getById("url_length_panel").style.marginTop = "-59px";
  }
}

function pass_btn() {
  if (getById("pass_btn").getAttribute("value") == "true") {
    getById("pass_btn").style.color = "#1f2937";
    getById("key").disabled = true;
    getById("key").style.opacity = "0";
    getById("key").value = "";
    getById("submit_btn").style.width = "100px";
    getById("pass_btn").setAttribute("value", "false");
  } else {
    getById("pass_btn").style.color = "#be2edd";
    getById("key").disabled = false;
    getById("key").style.opacity = "1";
    getById("submit_btn").style.width = "40px";
    getById("pass_btn").setAttribute("value", "true");
  }
}

function onetime_modal_show() {
  getById("onetime_modal").style.display = "block";
}

function onetime_modal_hide() {
  getById("onetime_modal").style.display = "none";
}

function otv_btn() {
  if (getById("otv_btn").getAttribute("value") == "true") {
    getById("otv_btn").style.color = "#1f2937";
    getById("otv_btn").setAttribute("value", "false");
    getById("onetime_modal").style.display = "block";
  } else {
    getById("otv_btn").style.color = "#f39c12";
    getById("otv_btn").setAttribute("value", "true");
    getById("onetime_modal").style.display = "none";
  }
}

function urll_btn() {
  if (getById("urll_btn").style.color == "rgb(58, 129, 245)") {
    getById("urll_btn").style.color = "#1f2937";
  } else {
    getById("urll_btn").style.color = "#3a81f5";
  }
}

function error_modal_hide() {
  getById("error_modal").style.display = "none";
}

function new_secret() {
  window.location.replace(myUrl);
}

function url_clipboard() {
  var copyText = getById("url_input");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  getById(
    "copy_btn"
  ).innerHTML = `<svg class="mr-2 -ml-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: inline;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Copied`;
  setTimeout(tt, 500);

  function tt() {
    getById(
      "copy_btn"
    ).innerHTML = `<svg class="mr-2 -ml-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: inline;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Copy`;
  }
}

function url_clipboard_secret() {
  var copyText = getById("secret_input");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  getById(
    "copy_btn1"
  ).innerHTML = `<svg class="mr-2 -ml-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: inline;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Copied`;
  setTimeout(tt, 500);
  function tt() {
    getById(
      "copy_btn1"
    ).innerHTML = `<svg class="mr-2 -ml-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: inline;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Copy`;
  }
}

function mythen(response) {
  if (typeof response.data == "object") {
    if (response.data.status == "success") {
      setTimeout(t, testDuration);
      function t() {
        getById("m_dynamic_secret").style.display = "none";
        getById("m_header").style.display = "none";
        getById("m_dynamic_url").style.display = "block";
        getById("url_input").setAttribute("value", response.data.url);
        var qrcode = new QRCode(document.getElementById("qrcode"), {
          text: response.data.url,
          width: 128,
          height: 128,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      }
    } else {
      getById("save_svg").style.display = "block";
      getById("loading_svg").style.display = "none";
      getById("text").disabled = false;
      if (getById("pass_btn").getAttribute("value") == "true") {
        getById("key").disabled = false;
      }
      show_error(response.data.text);
    }
  } else {
    show_error("Response Error", "The response received from the server is invalid");
  }
}

function textarea_check() {
  let text = getById("text").value;
  if (text.indexOf("\n") == -1) {
  } else {
    text = text.replace(/&#10;/g, "\n");
  }
  let length = text.length;
  if (length <= 3000 && getById("text").getAttribute("maxlength") == 3000) {
    return text;
  } else {
    text = text.substr(0, 3000);
    return text;
  }
}

function randStr(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function writeEntity(type, password) {
  let key = getById("key").value;
  let text = getById("text").value;
  if (text == null || text == "" || text == undefined) {
    show_error("Enter Your Secret!");
  } else {
    if (getById("pass_btn").getAttribute("value") == "true" && (key == null || key == "" || key == undefined)) {
      show_error("Enter Your Password!");
    } else {
      getById("save_svg").style.display = "none";
      getById("loading_svg").style.display = "block";
      getById("text").disabled = true;
      getById("key").disabled = true;
      if (type == "secret") {
        if (password == false) {
        }
        if (password == true) {
          text = textarea_check();
          key = getById("key").value;
          urlLength = document.querySelector('input[name="urlradio"]:checked').value;
          let oneTime = getById("otv_btn").getAttribute("value");
          var encryptedText = CryptoJS.AES.encrypt(text, key).toString();
          let curl;
          switch (urlLength) {
            case "8":
              curl = randStr(8);
              break;
            case "16":
              curl = randStr(16);
              break;
            case "24":
              curl = randStr(24);
              break;
            case "32":
              curl = randStr(32);
              break;
          }
          var keyHash = CryptoJS.PBKDF2(key, curl, {
            keySize: 256 / 32,
          });
          keyHash = keyHash.toString(CryptoJS.enc.Base64);
          axios
            .post("req.php", {
              action: "save_secret",
              oneTime: oneTime,
              key: keyHash,
              text: encryptedText,
              curl: curl,
            })
            .then(function (response) {
              mythen(response);
            })
            .catch(function (error) {
              show_error("Request Error", "The problem is in sending or receiving requests to the server");
            });
        }
      }
    }
  }
}

function delete_text() {
  axios
    .post("req.php", {
      action: "delete_secret",
      g_curl: curl,
    })
    .then(function (response) {})
    .catch(function (error) {
      show_error("Request Error", "The problem is in sending or receiving requests to the server");
    });
  getById("copy_btn1").style.display = "none";
  getById("secret_input").style.background = "#5C86FF";
  getById("secret_input").style.width = "2px";
  getById("secret_input").style.overflow = "hidden";
  getById("secret_input").style.borderRadius = "2px";
  getById("secret_input").style.border = "0";
  getById("secret_input").style.height = "24px";
  getById("secret_input").style.transform = "translateY(15px) scale(0.5)";
  setTimeout(tttt, 300);
  function tttt() {
    getById("secret_input").style.opacity = "0";
    setTimeout(ttttt, 2800);
    function ttttt() {
      window.location.replace(myUrl);
    }
  }
}

function clearConsole() {
  console.clear();
}

function init() {
  getById("key").style.transition = "0.5s";
  getById("submit_btn").style.transition = "0.5s";
  setTimeout(clearConsole, 100);
}

function text_input_length() {}

document.querySelectorAll(".button").forEach((button) =>
  button.addEventListener("click", (e) => {
    if (!button.classList.contains("delete")) {
      button.classList.add("delete");
      setTimeout(() => button.classList.remove("delete"), 3200);
    }
    e.preventDefault();
  })
);

init();
