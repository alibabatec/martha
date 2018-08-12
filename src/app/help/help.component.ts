import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
   templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  accordionData = [
    {title:'help.helpQue1',texthelpAns1:'help.helpAns1',textBold1:'help.txtBold1',textLink1:'help.txtLink1',textMsg1:'help.txtMsg1',textBold2:'help.txtBold2',textLink2:'help.txtLink2',textMsg2:'help.txtMsg2',textBold3:'help.txtBold3',textLink3:'help.txtLink3',textMsg3:'help.txtMsg3',textBold4:'help.txtBold4',textLink4:'help.txtLink4',textMsg4:'help.txtMsg4',textLink4a:'help.txtLink4a',textBold5:'help.txtBold5',text5First:'help.txt5First',textLink5:'help.txtLink5',textMsg5:'help.txtMsg5',textLink5a:'help.txtLink5a',textMsg5a:"help.txtMsg5a",textLink5b:'help.textLink5b'},
    // {title:'help.helpQue1', text:'help.helpAns1'},
    {title:'help.helpQue2', textAns2Msg:'help.txtAns2Msg',textAns2Link:'help.txtAns2Link',textAns2Msg2:'help.txtAns2Msg2',textAns2Link2:'help.txtAns2Link2',textAns2Msg3:'help.txtAns2Msg3'},
    {title:'help.helpQue3', textAns3Msg:'help.txtAns3Msg',textAns3Link:'help.txtAns3Link',textAns3Msg2:'help.txtAns3Msg2'},
    {title:'help.helpQue8', textAns8Msg:'help.txtAns8Msg',textAns8Link:'help.txtAns8Link',textAns8Msg2:'help.txtAns8Msg2'},
    {title:'help.helpQue9', textAns9Msg:'help.txtAns9Msg',textAns9Link:'help.txtAns9Link',textAns9Msg2:'help.txtAns9Msg2'},
    {title:'help.helpQue4', textHelpAns4:'help.helpAns4',textAns4Msg:'help.txtAns4Msg',textAns4Link:'help.txtAns4Link',textAns4Msg2:'help.txtAns4Msg2',textAns4Linka:'help.txtAns4Linka',textAns4Msg3:'help.txtAns4Msg3'},
    // {title:'help.helpQue5', textAns5Msg:'help.txtAns5Msg',textAns5Link:'help.txtAns5Link',textAns5Msg2:'help.txtAns5Msg2',textAns5Linka:'help.txtAns5Linka',textAns5Msg3:'help.txtAns5Msg3'},
    {title:'help.helpQue6', textAns6Msg:'help.txtAns6Msg',textAns6Link:'help.txtAns6Link',textAns6Msg2:'help.txtAns6Msg2'},
    {title:'help.helpQue7', textAns7Msg:'help.txtAns7Msg',textAns7Link:'help.txtAns7Link',textAns7Msg2:'help.txtAns7Msg2'},
    // {title:'help.helpQue8', textAns8Msg:'help.txtAns8Msg',textAns8Link:'help.txtAns8Link',textAns8Msg2:'help.txtAns8Msg2'},
    // {title:'help.helpQue9', textAns9Msg:'help.txtAns9Msg',textAns9Link:'help.txtAns9Link',textAns9Msg2:'help.txtAns9Msg2'},
  ]
  constructor() { }

  ngOnInit() {
  }

}
