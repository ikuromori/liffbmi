// LINE developersのメッセージ送受信設定に記載のアクセストークン
const LINE_TOKEN = '************'; 
const LINE_URL = 'https://api.line.me/v2/bot/message/reply';

//postリクエストを受取ったときに発火する関数
function doPost(e){
  var json = JSON.parse(e.postData.contents);
  //投稿されたtextデータ（e.postData.contents）をJSON形式の値に変換する
  
  //返信するためのトークン取得
  var reply_token=json.events[0].replyToken;
  //replyToken…イベントへの応答に使用するトークン(Messaging APIリファレンス)
  
  var message = JSON.parse(e.postData.contents).events[0].message.text;
  
  if(typeof reply_token === 'underfined'){
    //未定義の変数　typeof…オペランド(対象となる変数等のこと)の型を示す文字列を返す
    return;
  }

  //メッセージを改行ごとに分割
    const all_msg = message.split("\n");
//    const msg_num = all_msg.length;

  // ***************************
  // スプレットシートからデータを抽出
  // ***************************
  // 1. 今開いている（紐付いている）スプレッドシートを定義
  const sheet     = SpreadsheetApp.getActiveSpreadsheet();
  // 2. ここでは、デフォルトの「シート1」の名前が書かれているシートを呼び出し
  const listSheet = sheet.getSheetByName("シート1");
  // 3. 身長（LINEの入力目の１行目）をA2に入力
  const heightset = sheet.getRange("A2").setValue(all_msg[0]);
　// 4 .体重（LINEの入力目の２行目）をB2に入力
  const weightset = sheet.getRange("B2").setValue(all_msg[1]);
  //5 . スプレッドシート上で計算し、C2へ。C2と取得。
  const result = Math.round(sheet.getRange("C2").getValue());

  
  var text = '';
  if(message.match(/1/)){
    text='あなたのBMIは'+ result
  }

 //メッセージを返信
  UrlFetchApp.fetch(LINE_URL, {
    'headers':{
      'Content-Type':'application/json; charset=UTF-8',
      'Authorization':'Bearer '+ LINE_TOKEN,
    },
    'method':'post',
    'payload':JSON.stringify({
      'replyToken':reply_token,
      'messages':[{
        'type':'text',
        'text':text,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content':'post ok'})).setMimeType(ContentService.MimeType.JSON);
}