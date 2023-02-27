import { IBoard } from 'src/app/modules/board/model/Board.model';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';
import { ICheckBox } from 'src/app/pages/workspace-page/model/checkbox.interface';

export type NetworkRequest = IBoard | IColumn | ITask | ICheckBox;