import { observable, computed } from 'mobx-angular';
import {
  createModelSchema,
  primitive,
  reference,
  list,
  object,
  identifier,
  serialize,
  deserialize,
  getDefaultModelSchema,
  serializable,
} from 'serializr';
import * as moment from 'moment'; // Y'a un bug mais ça marche donc Fack it

export class KeyWord {
  @serializable name: string;
}

export class Post {

  @serializable id: string;
  @serializable titre: string;
  @serializable contenu: string;
  @serializable(list(object(KeyWord))) keyWords: KeyWord[] = new Array<KeyWord>();
  @serializable photo: string;
  @serializable lien: string;
  @serializable adress: string;
  @serializable theme: string;
  @serializable stackBlitz: string;
  @serializable date = '';


  constructor(data?) {
    this.setData(data);
  }

  setData(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @computed get postDate() {
    return moment(this.date || new Date()).format('DD/MM/YY');
  }

  @computed get getKeyWords() {
    if (this.keyWords) {
      return this.keyWords.map(keyWord => keyWord.name.toLowerCase());
    }
  }
}
