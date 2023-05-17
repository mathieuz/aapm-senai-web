const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.uid)
    console.log(user.email)

  } else {
    console.log("Nenhum admin logado.")

  }
});