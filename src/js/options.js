$(function(){

  // ローカルストレージに設定されている部所コードを表示する。
//   if (localStorage["bushoCode"]) {
//     $("#bushocode").val(localStorage["bushoCode"]);
//   } else {
//     $("#bushocode").val("498");
//   }
  chrome.storage.local.get(function(items) {
        if (items.bushoCode) {
            $("#bushocode").val(items.bushoCode);
        } else {
            $("#bushocode").val("498");
        }
    });

  
  // セーブボタンが押されたら、
  // ローカルストレージに保存する。
  $("#btnsave").click(function () {
    // localStorage["bushoCode"] = $("#bushocode").val();
    chrome.storage.local.set({bushoCode: $("#bushocode").val()}, function(){
      console.log("chrome.storage.local.set", "saved");
    });
  });
});

