const { tbl_bio } = require('./models')
// Kita lakukan query terhadap artikel
// Artikel tersebut memiliki id yang bernilai 1
const query = {
 where: { username: "admin_test" }
}
tbl_bio.update({
 role: "admin"
}, query)
.then(() => {
 console.log("Artikel berhasil diupdate")
 process.exit()
})
.catch(err => {
 console.error("Gagal mengupdate artikel!")
})