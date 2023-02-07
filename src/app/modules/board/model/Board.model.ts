export interface IBoard {
  idBoard: string;
  nameBoard: string;
  dateBoard:string;
  descriptionBoard: string;
  isChosen:boolean;
  columns: {
      idColumn: string;
      nameColumn: string;
      descriptionColumn: string;
      tasks: {
          idTask: string;
          nameTask: string;
          descriptionTask: string;
      }[];
  }[];
};

export interface IBoardCreateResponse {
  idBoard:string,
  nameBoard: string,
  dateBoard: string,
  descriptionBoard: string,
  isChosen:boolean,
  columns:[]
}

export interface IBoardUpdateResponse {
  nameBoard: string,
  descriptionBoard: string,
  dateBoard: string,
  isChosen:boolean
}

