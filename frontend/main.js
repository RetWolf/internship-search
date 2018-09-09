const getData = async () => {
  let response = await fetch('http://127.0.0.1:3001/api/v1/internship-search')
    .then(res => {
      return res.json();
    }).then(data => {
      return data;
  });
  return response;
}
