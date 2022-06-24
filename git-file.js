import fetch from "node-fetch";

async function check(blocks, token) {
  const arrayOrdenado = new Array(blocks[0]);
  let arrayIterante = [...blocks];
  arrayIterante.splice(0, 1);
  let longitud = blocks.length;
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
    if (arrayOrdenado.length === blocks.length) {
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
        return arrayOrdenado;
      }
    }
  }
}

// Enviamos datos desordenados para testear el resultado
let result = await check(
  ["f319", "3720", "4e3e", "46ec", "c7df", "c1c7", "80fd", "c4ea"],
  "b93ac073-eae4-405d-b4ef-bb82e0036a1d"
);

// Esperamos que el resultado sea como este array
let expected = ["f319", "46ec", "c1c7", "3720", "c7df", "c4ea", "4e3e", "80fd"];

if (result.join() === expected.join()) {
  console.log("Lo resolviste correctamente!");
} else {
  console.log("Todavía puedes intentarlo!");
}
