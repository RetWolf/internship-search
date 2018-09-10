const getData = async () => {
  return await fetch('http://127.0.0.1:3001/api/v1/internship-search')
    .then(res => {
      return res.json();
    }).then(data => {
      return data;
  });
}

let sheetPromise = getData();

const renderData = dataPromise => {
  dataPromise.then(data => {
    data.map(val => {
      console.info(val);
    })
  })
}

renderData(sheetPromise);