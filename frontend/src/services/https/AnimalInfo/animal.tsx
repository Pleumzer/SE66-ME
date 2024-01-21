import { AnimalInterface } from "../../../interfaces/IAnimal";
import { SexsInterface } from "../../../interfaces/IAnimalSex";

const apiUrl = "http://localhost:8080";

async function GetAnimal() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(`${apiUrl}/animals`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

async function GetSexs() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/AnimalSex`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetTypes() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/AnimalType`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetReproductions() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/AnimalReproduction`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

const CreateAnimal = async (values: AnimalInterface) => {
  let res = await fetch(`${apiUrl}/animals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

async function GetAnimalById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/animals/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function UpdateAnimal(data: AnimalInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/animals`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function DeleteAnimalByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/animals/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.message) {
        return res.message;
      } else {
        return false;
      }
    });

  return res;
}

const CreateAbnormalReport = async (values: AnimalInterface) => {
  let res = await fetch(`${apiUrl}/abnormalanimalreport`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

async function GetAbnormal() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/abnormalanimalreports`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function DeleteAbnormalByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/abnormalanimalreports/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.message) {
        return res.message;
      } else {
        return false;
      }
    });

  return res;
}

export {
  GetAnimal,
  GetSexs,
  GetTypes,
  GetReproductions,
  CreateAnimal,
  GetAnimalById,
  UpdateAnimal,
  DeleteAnimalByID,
  CreateAbnormalReport,
  GetAbnormal,
  DeleteAbnormalByID,
};
