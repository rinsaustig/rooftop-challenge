let result = ["f319", "3720", "4e3e", "46ec", "c7df", "c1c7", "80fd", "c4ea"];
let expected = ["f319", "46ec", "c1c7", "3720", "c7df", "c4ea", "4e3e", "80fd"];

function check(array) {
  const arrayOrdenado = new Array(array[0]);
  let arrayIterante = [...array];
  arrayIterante.splice(0, 1);
  let longitud = array.length + 1;
  let contador = 1;
  for (let i = 0; contador < longitud; i++) {
    if (i > 550) {
      return console.log("excesivas iteraciones");
    }
    arrayIterante.forEach((e, index) => {
      if (e === expected[contador]) {
        arrayOrdenado.push(e);
        arrayIterante.splice(index, 1);
        contador += 1;
      }
    });
    if (arrayOrdenado.length == array.length) {
      if (arrayOrdenado.join("") == expected.join("")) {
        console.log("Eureka!");
        return arrayOrdenado;
      } else {
        console.log("Puedes intentarlo nuevamente");
      }
    }
  }
}

check(result);

test("Devuelve un array con el orden esperado al recibirlo desordenado", () => {
  expect(check(result).join("")).toBe(expected.join(""));
});
