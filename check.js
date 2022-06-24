import fetch from "node-fetch";
async function get() {
  let url = "https://rooftop-career-switch.herokuapp.com/blocks?token=";
  let token = "INTRODUZCA SU TOKEN!";
  let response = await fetch(url + token, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  check(json, token);
}

async function check(array, token) {
  const arrayOrdenado = new Array(array.data[0]);
  let arrayIterante = [...array.data];
  arrayIterante.splice(0, 1);
  let longitud = array.data.length;
  let control = 0;
  let contador = 0;
  for (let i = 0; contador < longitud; i++) {
    control += 1;
    if (control > 150) {
      return console.log("excesivas iteraciones");
    }
    if (i == arrayIterante.length) {
      i = 0;
    }

    let body = {
      blocks: [arrayOrdenado[contador], arrayIterante[i]],
    };
    const url2 = "https://rooftop-career-switch.herokuapp.com/check?token=";

    const response2 = await fetch(url2 + token, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const resp2 = await response2.json();
    if (resp2.message === true) {
      arrayOrdenado.push(arrayIterante[i]);
      arrayIterante.splice(i, 1);
      contador += 1;
      i = 0;
    }
    if (arrayOrdenado.length === array.data.length) {
      let body2 = {
        encoded: arrayOrdenado.join(""),
      };
      const response3 = await fetch(url2 + token, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body2),
      });
      const resp3 = await response3.json();
      if (resp3.message == true) {
        console.log("Eureka!");
        return arrayOrdenado;
      }
    }
  }
}

get();
