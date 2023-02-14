export interface IBoard {
  idBoard: string;
  nameBoard: string;
  dateBoard: Date;
  descriptionBoard: string;
  isChosen: boolean;
  columns: {
    idColumn: string;
    nameColumn: string;
    descriptionColumn: string;
    tasks: {
      idTask: string;
      nameTask: string;
      descriptionTask: string;
      checkLists:{
        idCheckBox:string;
        nameCheckBox: string;
        isChoose: boolean;
    }[]
    }[];
  }[];
}

export interface IBoardCreateResponse {
  idBoard: string;
  nameBoard: string;
  dateBoard: Date;
  descriptionBoard: string;
  isChosen: boolean;
  columns: [];
}

export interface IBoardUpdateResponse {
  nameBoard: string;
  descriptionBoard: string;
  dateBoard: Date;
  isChosen: boolean;
}
