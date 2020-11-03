import { Component, OnInit,ViewChild } from '@angular/core';
import { Line } from 'src/app/shared/classes/Line';
import { Station } from 'src/app/shared/classes/Station';
import { LinesComponent } from 'src/app/shared/lines/lines.component';
import { AddLinesComponent } from './add-lines/add-lines.component';
import { EditLinesComponent } from './edit-lines/edit-lines.component';
import { LinesAdminService } from './lines-admin.service';

@Component({
  selector: 'app-lines-admin',
  templateUrl: './lines-admin.component.html',
  styleUrls: ['./lines-admin.component.css']
})
export class LinesAdminComponent implements OnInit {

  lines:Line[];
  location:Geolocation;
  lineId:number;
  sendPolyline:boolean=false;
  station:Station;


  @ViewChild(LinesComponent,{static:false}) childC:LinesComponent
  @ViewChild(AddLinesComponent,{static:false}) childAdd:AddLinesComponent
  @ViewChild(EditLinesComponent,{static:false}) childEdit:EditLinesComponent

  constructor(private lineAdminService:LinesAdminService) { }

  ngOnInit(){
    this.lineAdminService.SendAddressLocation.subscribe(
      data=>
      {
        this.location=data;
        if(data!=undefined)
        {
          this.childAdd.openModal('custom-modal-1');
        }
      });

    setTimeout(()=>
    {
      this.lines=this.childC.lines
    },1000);

    this.lineAdminService.TakeLineId.subscribe(
      data=>
      {
        if(data!=undefined)
        {
            this.lineId=data;
            this.childEdit.TakeLine(this.lineId);
        }
      }
    )

    this.lineAdminService.TakePolyline.subscribe(
      data=>
      {
        if(data==true)
        {
            this.childC.childC.addPolyline();
        }
      }
    )

    this.lineAdminService.GetStation.subscribe(
      data=>
      {
          if(data!=undefined)
          {
            this.childEdit.GetStation(data);
          }
      }
    )
  }
}