$(function () {

  // ローカルストレージに設定されている部所コードを表示する。
  //   if (localStorage["bushoCode"]) {
  //     $("#bushocode").val(localStorage["bushoCode"]);
  //   } else {
  //     $("#bushocode").val("498");
  //   }
  chrome.storage.local.get(function (items) {
    if (items.bushoCode) {
      $("#bushocode").val(items.bushoCode);
    } else {
      $("#bushocode").val("498");
    }
    if (items.zaitaku) {
      $("#zaitaku").prop('checked', items.zaitaku);
    } else {
      $("#zaitaku").prop('checked', false);
    }
  });


  // セーブボタンが押されたら、
  // ローカルストレージに保存する。
  $("#btnsave").click(function () {
    // localStorage["bushoCode"] = $("#bushocode").val();
    chrome.storage.local.set({
       bushoCode: $("#bushocode").val(),
       zaitaku: $("#zaitaku").prop('checked')
      }, function () {
      console.log("chrome.storage.local.set", "saved");
    });
  });
});

