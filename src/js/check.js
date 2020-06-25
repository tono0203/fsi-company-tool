// COMPANYのURL
var companyURLreg = /.*\/cws\/cws/
// 社員名簿DBのURL
var meiboURLreg = /.*_office-only\/meiboDB\/.*/
// 簡易WF URL
var wfURLreg = /.*\/wf\/.*/

$(document).ready(function () {
  var href = window.location.href;
  // ---------------------------------------
  // COMPANY
  // ---------------------------------------
  if (href.match(companyURLreg)) {
    // 実績確認画面にチェック＆確認をつけるボタン
    if ($("#DCMLTAPRV")[0]) {
      $("div.globalnavi")
        .append("<input type='button' value='15日までチェック＆確認' class='check-button' id='btn-83947'></input>");
      $(document).on("click", "#btn-83947", function (e) {
          var flag = false;
          $("[id^=BTNDCCOR]").each(function () {
            var tmp = $(this).attr("id").substr(8);
            tmp = tmp.substr(0, tmp.length - 1);
            var index = tmp.lastIndexOf("_");
            if (0 < index) {
              var curDate = tmp.substr(index + 1, tmp.length - 1);
              if (curDate <= 15) {
                $("#CHK" + tmp).prop("checked", true);
                flag = true;
              }
            }
          });
          if (flag) {
            $("#DCMLTAPRV")[0].click();
          } else {
            alert("対象データがありません");
          }
      });
        $("div.globalnavi")
        .append("<input type='button' value='チェック＆確認' class='check-button' id='btn-83948'></input>");
        $(document).on("click", "#btn-83948", function (e) {
          $("[id^=BTNDCCOR]").each(function () {
            var tmp = $(this).attr("id").substr(8);
            tmp = tmp.substr(0, tmp.length - 1);
            $("#CHK" + tmp).prop("checked", true);
          });
          $("#DCMLTAPRV")[0].click();
        });
    }
    // 月締承認画面にチェック＆確認をつけるボタン
    if ($("#MLTSBMTAPRV")[0]) {
      $("div.globalnavi")
        .append("<input type='button' value='すべてチェック' class='check-button'></input>")
        .bind("click", function (e) {
          $("[id^=cbx]").each(function () {
            $(this).prop("checked", true);
          });
        });
    }

    // COMPANYにCOPY／PASTE／全部ボタンを追加
    if ($("#KNMTMRNGSTD")[0]) {
      $('html').append("<input type='hidden' id='jviuh5o6y6622oHIDDEN'>");
      addCpPasteButtons();

      // DOM要素の変更を監視してコピペボタンの追加をする
      var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
        addCpPasteButtons();
      });
      observer.observe($('#PM_PANEL_ENTRY_TIME_WIDGET_CONTAINER_AREA').get(0), {
        childList: true,
      });
    }
    // Alt+nで次へボタンクリック
    if ($("#btnNext0")[0]) {
      $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 78:
                // Key: Alt + n
                if (e.altKey){
                  $("#btnNext0").click();
                }
                break;
        }
      });
    }
    // Alt+nで申請ボタンクリック
    if ($("#dSubmission0")[0]) {
      $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 78:
                // Key: Alt + n
                if (e.altKey){
                  $("#dSubmission0").click();
                }
                break;
        }
      });
    }
    


    return;
  }

  // ---------------------------------------
  // 社員DB
  // ---------------------------------------
  if (href.match(meiboURLreg)) {
    // 右クリックを有効化
    $("html").attr('oncontextmenu', 'return true');
    return;
  }

  // ---------------------------------------
  // 簡易WF
  // ---------------------------------------
  if (href.match(wfURLreg)) {
    // 選択肢を絞る
    var sels = $("select");
    if (sels[0]) {
      var reg1 = /^開発計画書（/
      var reg2 = /^納入物件チェックリスト/
      chrome.storage.local.get(function (items) {
        var bushoCode = (items.bushoCode) ? items.bushoCode : "498";
        var reg3 = new RegExp(bushoCode);
        var addButton = (void 0);
        for (var i = 0; i < sels.length; i++) {
          var options = $(sels[i]).children();
          for (var j = 0; j < options.length; j++) {
            var curStr = $(options[j]).text();
            if (curStr.match(reg1) || curStr.match(reg2)) {
              if (!curStr.match(reg3)) {
                $(options[j]).hide();
                addButton = sels[i];
              }
            }
          }
        }
        if (addButton) {
          // ボタンを追加。IDは重複しないように乱数にしてある
          $(addButton).parent().append("<input type='button' value='全表示' title='隠した部所を全表示' id='jviuh5o6y6622osz'></input>");
          $(document).on("click", "#jviuh5o6y6622osz", function (e) {
            var options = $(addButton).children();
            for (var j = 0; j < options.length; j++) {
              var curStr = $(options[j]).show();
            }
          });
        }
      });
    }
    return;
  }
});

/**
 * COMPNAYの日毎入力画面にコピペボタンを追加する
 */
function addCpPasteButtons() {
  $(".PmPanelEntryTimeStateEachRowStyle").each(function (index) {
    $(this).append("<button style='margin-left:10px' id='jviuh5o6y6622oXY-" + index + "' title='実績時間のコピー'>Ｃ</button>");
    $(this).append("<button id='jviuh5o6y6622oPASTE-" + index + "' title='実績時間の貼り付け'>Ｐ</button>");
    $(this).append("<button style='margin-left:10px' id='jviuh5o6y6622oJITSU-" + index + "' title='本日の実働時間を入力'>全</button>");
    $(document).on("click", "#jviuh5o6y6622oXY-" + index, function (e) {
      var val = {
        hour: $('#PmDdEntryTimeInputWidget_' + index + 'H').val(),
        minute: $('#PmDdEntryTimeInputWidget_' + index + 'M').val()
      }
      $('#jviuh5o6y6622oHIDDEN').val(JSON.stringify(val));
    });
    $(document).on("click", "#jviuh5o6y6622oPASTE-" + index, function (e) {
      var val = $('#jviuh5o6y6622oHIDDEN').val();
      if (val && 0 < val.length) {
        var o = JSON.parse(val);
        $('#PmDdEntryTimeInputWidget_' + index + 'H').val(o.hour);
        $('#PmDdEntryTimeInputWidget_' + index + 'M').val(o.minute);
      }
    });
    $(document).on("click", "#jviuh5o6y6622oJITSU-" + index, function (e) {
      var hour = $('#JTDMIH').text();
      var minute = $('#JTDMIM').text();
      if (hour && minute) {
        $('#PmDdEntryTimeInputWidget_' + index + 'H').val(hour);
        $('#PmDdEntryTimeInputWidget_' + index + 'M').val(minute);
      }
    });
  });
  // 在宅勤務利用
  $("#GI10").each(function () {
    if (!$("#ILKJLGGNdslkf3GI10ZT")[0]) {
      $(this).parent().append("<button style='margin-left:10px' id='ILKJLGGNdslkf3GI10ZT' title='実行時間を全部在宅勤務にする'>終日在宅</button>");
      $(document).on("click", "#ILKJLGGNdslkf3GI10ZT", function (e) {
        var sday = $('#KNMTMRNGSTD').val();
        var shour = $('#KNMTMRNGSTH').val();
        var sminute = $('#KNMTMRNGSTM').val();
        var eday = $('#KNMTMRNGETD').val();
        var ehour = $('#KNMTMRNGETH').val();
        var eminute = $('#KNMTMRNGETM').val();
        if (shour && sminute && ehour && eminute) {
          $('select[name="GI_COMBOBOX13_Seq0S"]').val(2);
          $('select[name="GI_TIMERANGE14_Seq0STD"]').val(sday);
          $('input[name="GI_TIMERANGE14_Seq0STH"]').val(shour);
          $('input[name="GI_TIMERANGE14_Seq0STM"]').val(sminute);
          $('select[name="GI_TIMERANGE14_Seq0ETD"]').val(eday);
          $('input[name="GI_TIMERANGE14_Seq0ETH"]').val(ehour);
          $('input[name="GI_TIMERANGE14_Seq0ETM"]').val(eminute);
        }
      });
      $(this).parent().append("<button style='margin-left:10px' id='ILKJLGGNdslkf3GI10NZ' title='在宅勤務を解除する'>在宅解除</button>");
      $(document).on("click", "#ILKJLGGNdslkf3GI10NZ", function (e) {
          $('select[name="GI_COMBOBOX13_Seq0S"]').val(1);
          $('select[name="GI_TIMERANGE14_Seq0STD"]').val('0');
          $('input[name="GI_TIMERANGE14_Seq0STH"]').val('0');
          $('input[name="GI_TIMERANGE14_Seq0STM"]').val('0');
          $('select[name="GI_TIMERANGE14_Seq0ETD"]').val('0');
          $('input[name="GI_TIMERANGE14_Seq0ETH"]').val('0');
          $('input[name="GI_TIMERANGE14_Seq0ETM"]').val('0');
    });
    }
  });

}