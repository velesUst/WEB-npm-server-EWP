
export enum PType {
  NONE = 0,
  IMPULSE = 1, 
  LEADINGDIAGONAL = 2, 
  ENDINGDIAGONAL = 3, 
  ZIGZAG = 4, 
  FLAT = 5, 
  TRIANGLES = 6, 
  DOUBLETHREE = 7, 
  TRIPLETHREE = 8
}

export const dateFormat0 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{3}Z$/;
export const dateFormat1 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
export function reviver(key, value) {
  if (typeof value === "string" && (dateFormat0.test(value) || dateFormat1.test(value))) {
    return new Date(value);
  }

  return value;
}

export function getSubWaveNames( type: PType): string[] {  
  var ret: string [] = [];
  switch(type)
  {   
      case PType.IMPULSE:
          ret = ['0', '1', '2', '3', '4', '5'];
          break;
  
      case PType.LEADINGDIAGONAL:
          ret = ['0', '1', '2', '3', '4', '5'];
          break;
          
      case PType.ENDINGDIAGONAL:
          ret = ['0', '1', '2', '3', '4', '5'];
          break;

      case PType.ZIGZAG:
          ret = ['0', 'A', 'B', 'C'];
          break;

      case PType.FLAT:
          ret = ['0', 'A', 'B', 'C'];
          break;
      
      case PType.TRIANGLES:
          ret = ['0', 'A', 'B', 'C', 'D', 'E'];
          break;

      case PType.DOUBLETHREE:
          ret = ['0', 'W', 'X', 'Y'];
          break;

      case PType.TRIPLETHREE:
          ret = ['0', 'W', 'X', 'Y', 'XX', 'Z'];
          break;
  
      default:
          ret = [];
  } 
  //Главный: [I] [II] [III] [IV] [V], против тренда [A] [B] [C].
  //Суперцикл: (I) (II) (III) (IV) (V), против тренда (A) (B) (C).
  //Цикл: I II III IV V, против тренда A B C.
  //Первичный: I II III IV V, против тренда A B C.
  //Промежуточный: [1] [2] [3] [4] [5], против тренда [a] [b] [c].
  //Вторичный: (1) (2) (3) (4) (5), против тренда (a) (b).
  //Минутный: 1 2 3 4 5, против тренда a b c.
  //Маленький: 1 2 3 4 5, против тренда abc.
  //Отсюда: https://binguru.net/volny-elliotta-4321
  return ret;
}