import { IBalanceGetResponse } from "./interfaces/IBalance";
import Resizer from "react-image-file-resizer";
import { balanceDictionary, GameTypeDictionary, ChanceDictionary } from "./common/dictionary";

export const parseJwt = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const convertToBase64 = (image, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  reader.addEventListener("load", () => {
    const img: any = new Image();
    img.src = reader.result;

    img.onload = () => {
      callback(img.src);
    };
  });
};

export const imageResizer = (image, dimension, cb) => {
  Resizer.imageFileResizer(image, dimension, dimension, "PNG", 100, 0, uri => { cb(uri); }, "blob");
};

export const getPermissionLevelName = (permissionLevel: number): string => {
  let result = "";
  if (permissionLevel === 4) {
    result = "masters";
  }
  if (permissionLevel === 2) {
    result = "agents";
  }
  if (permissionLevel === 1) {
    result = "players";
  }
  return result;
};

export const userTree = (data, type?) => {
  return data.filter(item => {
    item.children = [];
    const parent = data.find(({ id }) => id === item.parent?.id);
    if (parent) {
      item._isShow = type ? item._isShow : false;
      item._isShowChildren = type ? item._isShowChildren : false;
      parent.children.push(item);
    } else {
      item._isShow = type ? item._isShow : true;
      item._isShowChildren = type ? item._isShowChildren : false;
      return item;
    }

    return null;
  });
};

export const switchModalGlobal = (context, e) => {
  try {
    const modal = e.currentTarget.dataset.modal;
    context.setState({
      [modal]: !context.state[modal]
    });
  } catch (error) {
    context.setState({ [e]: false });
  }
};

export function changeBalance (data: number, type?: boolean, property?: string | string[]): number;
export function changeBalance (data: object[], type?: boolean, property?: string | string[]): object[];
export function changeBalance (data: any, type?: boolean, property: string | string[] = "balance"): any {
  if (typeof data !== "object") {
    return type ? data * 100 : data / 100;
  }

  if (Array.isArray(property)) {
    return data.map(item => {
      for (const key in item) {
        if (property.indexOf(key) !== -1) {
          item[key] = item[key] / 100
        }
      }

      return item;
    });
  } else {
    return data.map(item => ({
      ...item,
      [property]: item[property] / 100
    }));
  }
};

export const stringTrim = (str: string): string => {
  let shortString = "";

  if (str.length > 20) {
    shortString = str
      .split("")
      .splice(0, 20)
      .join("");

    return `${shortString}...`;
  }

  return str;
};

export const compareOptions = (option1, option2) => {
  function objectsAreSame(x, y) {
    let objectsAreSame = true;
    for (const propertyName in x) {
      if (x[propertyName].name !== (y[propertyName] ? y[propertyName].name : null)) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }

  try {
    return objectsAreSame(option1, option2) ? "regularOptions" : "customOptions";
  } catch (error) {
    return "regularOptions";
  }
}

export const sort = (array, property, reverse?) => {
  return (
    [...array].sort((a, b) => {
      if (a[property] > b[property]) {
        return reverse ? -1 : 1;
      }
      if (a[property] < b[property]) {
        return reverse ? 1 : -1;
      }
      return 0;
    })
  );
};

export const setSelectedOptions = (matches, ticket) => {
  return matches.map(item => {
    const currentTicket = ticket.bet.find(({ matchId }) => matchId === item.id);
    if (currentTicket) {
      return {
        ...item,
        options: item.options.map(item => (item.name === currentTicket.bet ? { ...item, status: true } : item))
      };
    }

    return item;
  })
}

export const renderSwitch = (type: number): string => {
  switch (type) {
    case GameTypeDictionary.GAME_TYPE_BEST_AT_TABLE: {
      return "Best at Table";
    }

    case GameTypeDictionary.GAME_TYPE_CHECKPOINT: {
      return "Checkpoint";
    }

    case GameTypeDictionary.GAME_TYPE_ONE_ON_ONE: {
      return "One On One";
    }

    case GameTypeDictionary.GAME_TYPE_MONTH_PRIZE: {
      return "Month Prize";
    }

    case GameTypeDictionary.GAME_TYPE_DAILY: {
      return "Group Bet";
    }

    case GameTypeDictionary.GAME_TYPE_JACKPOT: {
      return "Jackpot";
    }

    case GameTypeDictionary.GAME_TYPE_CHANCE: {
      return "Chance";
    }

    default:
      return "GAME";
  }
};

export const balanceDescription = (item: IBalanceGetResponse, translate, isTransactions: boolean = false): string[]=> {
  const returnData: string[] = [];
  switch (item.type) {
    case balanceDictionary.BALANCE_TYPE_ADD:
    case balanceDictionary.BALANCE_TYPE_SCEDUAL_PAYMENT:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(item.providerGameName ? renderSwitch(Number(item.providerGameName)) : "");
      break;
    case balanceDictionary.BALANCE_TYPE_CASHBACK:
      returnData.push(translate("BALANCE_TYPE_CASHBACK"));
      returnData.push(item.providerGameName ? renderSwitch(Number(item.providerGameName)) : "");
      break;
    case balanceDictionary.BALANCE_TYPE_REDUCE:
      returnData.push(translate("BALANCE_TYPE_REDUCE"));
      returnData.push(item.providerGameName ? renderSwitch(Number(item.providerGameName)) : "");
      break;
    case balanceDictionary.BALANCE_TYPE_SCEDUAL_REDUCE:
    case balanceDictionary.BALANCE_TYPE_SCEDUAL_REDUCE_BALANCE:
      returnData.push(translate("BALANCE_TYPE_SCEDUAL_REDUCE"));
      returnData.push(item.providerGameName ? renderSwitch(Number(item.providerGameName)) : "");
      break;
    case balanceDictionary.BALANCE_TYPE_REFUND:
      returnData.push(translate("BALANCE_TYPE_REFUND"));
      returnData.push(item.providerGameName ? renderSwitch(Number(item.providerGameName)) : "");
      break;
    case balanceDictionary.BALANCE_TYPE_TAKE:
    case balanceDictionary.BALANCE_TYPE_SCEDUAL_TAKE:
      returnData.push(translate("BALANCE_TYPE_TAKE"));
      returnData.push(item.providerGameName ? renderSwitch(Number(item.providerGameName)) : "");
      break;
    case balanceDictionary.BALANCE_TYPE_TRANSFER:
    case balanceDictionary.BALANCE_TYPE_SCEDUAL_TRANSFER:
      returnData.push(translate("BALANCE_TYPE_TRANSFER"));
      returnData.push(item.providerGameName ? renderSwitch(Number(item.providerGameName)) : "");
      break;
    // case balanceDictionary.BALANCE_TYPE_EVOLUTION_DEBIT:
    // case balanceDictionary.BALANCE_TYPE_EVOLUTION_SCEDUAL_DEBIT:
    //   // return `BET ${item.evoGameName}`;
    //   return `BET EVOLUTION`;
    // case balanceDictionary.BALANCE_TYPE_EVOLUTION_CREDIT:
    //   // return `ADD ${item.evoGameName}`;
    //   return `WIN EVOLUTION`;
    // case balanceDictionary.BALANCE_TYPE_EVOLUTION_CANCEL:
    // case balanceDictionary.BALANCE_TYPE_EVOLUTION_SCEDUAL_CANCEL:
    //   // return `CANCEL ${item.evoGameName}`;
    //   return `ROLLBACK EVOLUTION`;
    case balanceDictionary.BALANCE_TYPE_BS_BET:
    case balanceDictionary.BALANCE_TYPE_BS_SCEDUAL_BET:
      returnData.push(translate("BALANCE_TYPE_REDUCE"));
      returnData.push(`BS ${item.providerGameName || ""}`)
      break;
    case balanceDictionary.BALANCE_TYPE_BS_WIN:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(`BS ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_BS_CANCEL:
    case balanceDictionary.BALANCE_TYPE_BS_SCEDUAL_CANCEL:
      returnData.push(translate("BALANCE_TYPE_REFUND"));
      returnData.push(`BS ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_SLOTS_DEBIT:
    case balanceDictionary.BALANCE_TYPE_SLOTS_SCEDUAL_DEBIT:
      returnData.push(translate("BALANCE_TYPE_REDUCE"));
      returnData.push(`SLOTS ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_SLOTS_CREDIT:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(`SLOTS ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_SLOTS_CANCEL:
    case balanceDictionary.BALANCE_TYPE_SLOTS_SCEDUAL_CANCEL:
      returnData.push(translate("BALANCE_TYPE_REFUND"));
      returnData.push(`SLOTS ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_NOVO_BET:
    case balanceDictionary.BALANCE_TYPE_NOVO_SCEDUAL_BET:
      returnData.push(translate("BALANCE_TYPE_REDUCE"));
      returnData.push(`NOVO ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_NOVO_WIN:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(`NOVO ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_NOVO_ROLLBACK:
    case balanceDictionary.BALANCE_TYPE_NOVO_SCEDUAL_ROLLBACK:
      returnData.push(translate("BALANCE_TYPE_REFUND"));
      returnData.push(`NOVO ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_NOVO_JACKPOT:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(`NOVO ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_TVBET_BET:
    case balanceDictionary.BALANCE_TYPE_TVBET_SCEDUAL_BET:
      returnData.push(translate("BALANCE_TYPE_REDUCE"));
      returnData.push(`TVBET ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_TVBET_WIN:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(`TVBET ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_TVBET_ROLLBACK:
    case balanceDictionary.BALANCE_TYPE_TVBET_SCEDUAL_ROLLBACK:
      returnData.push(translate("BALANCE_TYPE_REFUND"));
      returnData.push(`TVBET ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_TVBET_JACKPOT:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(`TVBET ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_TGG_BET:
    case balanceDictionary.BALANCE_TYPE_TGG_SCEDUAL_BET:
      returnData.push(translate("BALANCE_TYPE_REDUCE"));
      returnData.push(`TGG ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_TGG_WIN:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(`TGG ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_TGG_ROLLBACK:
    case balanceDictionary.BALANCE_TYPE_TGG_SCEDUAL_ROLLBACK:
      returnData.push(translate("BALANCE_TYPE_REFUND"));
      returnData.push(`TGG ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_NUXAPI_DEBIT:
    case balanceDictionary.BALANCE_TYPE_NUXAPI_SCEDUAL_DEBIT:
      returnData.push(translate("BALANCE_TYPE_REDUCE"));
      returnData.push(`EVOLUTION ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_NUXAPI_CREDIT:
      returnData.push(translate("BALANCE_TYPE_ADD"));
      returnData.push(`EVOLUTION ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_NUXAPI_TIP:
    case balanceDictionary.BALANCE_TYPE_NUXAPI_SCEDUAL_TIP:
      returnData.push(translate("BALANCE_TYPE_REDUCE"));
      returnData.push(`EVOLUTION ${item.providerGameName || ""}`);
      break;
    case balanceDictionary.BALANCE_TYPE_NUXAPI_ROLLBACK:
      returnData.push(translate("BALANCE_TYPE_REFUND"));
      returnData.push(`EVOLUTION ${item.providerGameName || ""}`);
      break;
    default:
      returnData.push("Type is not defined");
      break;
  }

  return returnData;
}

export const getTypeByTypeName = (name: string): number[]=> {
  switch (name) {
    case "BALANCE_TYPE_ADD":
      return [
        balanceDictionary.BALANCE_TYPE_ADD,
        balanceDictionary.BALANCE_TYPE_SCEDUAL_PAYMENT,
        balanceDictionary.BALANCE_TYPE_BS_WIN,
        balanceDictionary.BALANCE_TYPE_SLOTS_CREDIT,
        balanceDictionary.BALANCE_TYPE_NOVO_WIN,
        balanceDictionary.BALANCE_TYPE_TVBET_WIN,
        balanceDictionary.BALANCE_TYPE_TGG_WIN,
        balanceDictionary.BALANCE_TYPE_NUXAPI_CREDIT,
        balanceDictionary.BALANCE_TYPE_NOVO_JACKPOT,
        balanceDictionary.BALANCE_TYPE_TVBET_JACKPOT,
      ];
    case "BALANCE_TYPE_CASHBACK":
      return [balanceDictionary.BALANCE_TYPE_CASHBACK];
    case "BALANCE_TYPE_REDUCE":
      return [
        balanceDictionary.BALANCE_TYPE_REDUCE,
        balanceDictionary.BALANCE_TYPE_SCEDUAL_REDUCE,
        balanceDictionary.BALANCE_TYPE_BS_BET,
        balanceDictionary.BALANCE_TYPE_BS_SCEDUAL_BET,
        balanceDictionary.BALANCE_TYPE_SLOTS_DEBIT,
        balanceDictionary.BALANCE_TYPE_SLOTS_SCEDUAL_DEBIT,
        balanceDictionary.BALANCE_TYPE_NOVO_BET,
        balanceDictionary.BALANCE_TYPE_NOVO_SCEDUAL_BET,
        balanceDictionary.BALANCE_TYPE_TVBET_BET,
        balanceDictionary.BALANCE_TYPE_TVBET_SCEDUAL_BET,
        balanceDictionary.BALANCE_TYPE_TGG_BET,
        balanceDictionary.BALANCE_TYPE_TGG_SCEDUAL_BET,
        balanceDictionary.BALANCE_TYPE_NUXAPI_DEBIT,
        balanceDictionary.BALANCE_TYPE_NUXAPI_SCEDUAL_DEBIT,
        balanceDictionary.BALANCE_TYPE_NUXAPI_TIP,
        balanceDictionary.BALANCE_TYPE_NUXAPI_SCEDUAL_TIP,
      ];
    case "BALANCE_TYPE_REFUND":
      return [
        balanceDictionary.BALANCE_TYPE_REFUND,
        balanceDictionary.BALANCE_TYPE_BS_CANCEL,
        balanceDictionary.BALANCE_TYPE_BS_SCEDUAL_CANCEL,
        balanceDictionary.BALANCE_TYPE_SLOTS_CANCEL,
        balanceDictionary.BALANCE_TYPE_SLOTS_SCEDUAL_CANCEL,
        balanceDictionary.BALANCE_TYPE_NOVO_ROLLBACK,
        balanceDictionary.BALANCE_TYPE_NOVO_SCEDUAL_ROLLBACK,
        balanceDictionary.BALANCE_TYPE_TVBET_ROLLBACK,
        balanceDictionary.BALANCE_TYPE_TVBET_SCEDUAL_ROLLBACK,
        balanceDictionary.BALANCE_TYPE_TGG_ROLLBACK,
        balanceDictionary.BALANCE_TYPE_TGG_SCEDUAL_ROLLBACK,
        balanceDictionary.BALANCE_TYPE_NUXAPI_ROLLBACK,
      ];
    case "BALANCE_TYPE_TAKE":
      return [
        balanceDictionary.BALANCE_TYPE_TAKE,
        balanceDictionary.BALANCE_TYPE_SCEDUAL_TAKE,
      ];
    case "BALANCE_TYPE_TRANSFER":
      return [
        balanceDictionary.BALANCE_TYPE_TRANSFER,
        balanceDictionary.BALANCE_TYPE_SCEDUAL_TRANSFER,
      ];
    case "BALANCE_TYPE_SCEDUAL_REDUCE":
      return [
        balanceDictionary.BALANCE_TYPE_SCEDUAL_REDUCE,
        balanceDictionary.BALANCE_TYPE_SCEDUAL_REDUCE_BALANCE,
      ];
    default:
      return [];
  }
}
    
export const getCardByValue = (cardValue: number): string => {
  switch (cardValue) {
    case 0:
      return "None";
    case 7:
      return "7";
    case 8:
      return "8";
    case 9:
      return "9";
    case 10:
      return "10";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    case 14:
      return "A";
    default:
      return "None";
  }
}

export const getChanceType = (type: number): string => {
  switch (type) {
    case ChanceDictionary.CHANCE_BET_TYPE_ACCURATE_PREDICTION:
      return "Special";
    case ChanceDictionary.CHANCE_BET_TYPE_PARITY_PREDICTION:
      return "Parity";
    case ChanceDictionary.CHANCE_BET_TYPE_MORE_LESS_PREDICTION:
      return "MoreLess";
    default:
      return "";
  }
}
