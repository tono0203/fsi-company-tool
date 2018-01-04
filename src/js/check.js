$(document).ready(function(){
  // COMPANYにチェックをつけるボタン追加
	if ($("#DCMLTAPRV")[0]) {
    $("div.globalnavi")
      .append("<input type='button' value='チェックを付ける' class='check-button'></input>")
      .bind("click", function(e) {
        $("[id^=BTNDCCOR]").each(function(){
          var tmp = $(this).attr("id").substr(8);
          tmp = tmp.substr(0, tmp.length - 1);
          $("#CHK" + tmp).prop("checked",true);
        });
      });
  }

  // 簡易WFの選択肢を絞る
  var href = window.location.href;
  var sels = $("select");
  if (sels[0]) {
    var reg1 = /^開発計画書（/
    var reg2 = /^納入物件チェックリスト/
    chrome.storage.local.get(function(items) {
        var bushoCode = (items.bushoCode) ? items.bushoCode : "498";
        var reg3 = new RegExp(bushoCode);
        var addButton = (void 0);
        for(var i=0; i< sels.length; i++) {
          var options = $(sels[i]).children();
          for(var j=0; j<options.length; j++) {
            var curStr = $(options[j]).text();
            if (curStr.match(reg1) || curStr.match(reg2)){
              if(!curStr.match(reg3)) {
                $(options[j]).hide();
                addButton = sels[i];
              }
            }
          }
        }
        if (addButton){
          // ボタンを追加。IDは重複しないように乱数にしてある
          $(addButton).parent().append("<input type='button' value='全表示' title='隠した部所を全表示' id='jviuh5o6y6622osz'></input>");
          $(document).on("click", "#jviuh5o6y6622osz", function(e){
            var options = $(addButton).children();
            for(var j=0; j<options.length; j++) {
              var curStr = $(options[j]).show();
            }
          });
        }
    });
  }

  // 社員DBで右クリックを有効化
  var meiboURLreg = /.*_office-only\/meiboDB\/.*/
  if (href.match(meiboURLreg)){
    $("html").attr('oncontextmenu','return true');
    //$("div[style*='background:url(']")
  }
  
  // COMPANYにCOPY／PASTE／全部ボタンを追加
  if ($("#KNMTMRNGSTD")[0]){
    $('html').append("<input type='hidden' id='jviuh5o6y6622oHIDDEN'>");
    $(".PmPanelEntryTimeStateEachRowStyle").each(function(index){
      $(this).append("<button style='margin-left:10px' id='jviuh5o6y6622oXY-"+index+"' title='実績時間のコピー'>Ｃ</button>");
      $(this).append("<button id='jviuh5o6y6622oPASTE-"+index+"' title='実績時間の貼り付け'>Ｐ</button>");
      $(this).append("<button style='margin-left:10px' id='jviuh5o6y6622oJITSU-"+index+"' title='本日の稼働時間を入力'>全</button>");
      $(document).on("click", "#jviuh5o6y6622oXY-"+index, function(e){
        var val = {
          hour: $('#PmDdEntryTimeInputWidget_' + index + 'H').val(),
          minute: $('#PmDdEntryTimeInputWidget_' + index + 'M').val()
        }
        $('#jviuh5o6y6622oHIDDEN').val(JSON.stringify(val));
      });
      $(document).on("click", "#jviuh5o6y6622oPASTE-"+index, function(e){
        var val = $('#jviuh5o6y6622oHIDDEN').val();
        if (val && 0 < val.length) {
          var o = JSON.parse(val);
          $('#PmDdEntryTimeInputWidget_' + index + 'H').val(o.hour);
          $('#PmDdEntryTimeInputWidget_' + index + 'M').val(o.minute);
        }
      });
      $(document).on("click", "#jviuh5o6y6622oJITSU-"+index, function(e){
        var hour = $('#JTDMIH').text();
        var minute = $('#JTDMIM').text();
        if (hour && minute) {
          $('#PmDdEntryTimeInputWidget_' + index + 'H').val(hour);
          $('#PmDdEntryTimeInputWidget_' + index + 'M').val(minute);
        }
      });
    });
  }
  
});
