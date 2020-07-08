import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item-model';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})


export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems:BudgetItem[];
  @Output() delete:EventEmitter<any>=new EventEmitter<any>();
  @Output() update:EventEmitter<updateEvent>=new EventEmitter<updateEvent>();
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteButtonClick(item:BudgetItem){
    this.delete.emit(item);
  }

  onCardClick(item:BudgetItem){
    const diaglogRef=this.dialog.open(EditItemModalComponent,{
      width:"580px",
      data:item
    });

    diaglogRef.afterClosed().subscribe(result=>{
      if(result){
        //this.budgetItems[this.budgetItems.indexOf(item)]=result;
        this.update.emit({
          old:item,
          new:result
        });
      }
    })
  }
}

export interface updateEvent{
  old:BudgetItem;
  new:BudgetItem;
}
