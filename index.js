const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config()
const port = process.env.PORT || 3000

// SetUp EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/favicon.ico', express.static('favicon.ico'));



app.get('/', (req, res) => {

    if ('jumlah' in req.query) {
        const main = (input) => {
            const inputPendekarDanMonster = input;


            let bambang = [];

            let sisikanan = [];
            for (let i = 0; i < parseInt(inputPendekarDanMonster); i++) {
                sisikanan.push(`P`, `M`);
            }


            let sisikiri = [],
                perahu = [];


            let perjalanan = 0;
            bambang[0] = { perjalanan: "awal", tepiawal: sisikanan, tepiakhir: sisikiri, pergerakan: perahu }
                // bambang.push(new Object({ perjalanan: "awal", tepiawal: sisikanan, tepiakhir: sisikiri, pergerakan: perahu }))
            while (sisikanan.length > 0) {

                if (sisikiri.length === 0) {
                    perahu.push(sisikanan[0], sisikanan[1])
                    sisikanan.splice(0, 2)
                    perjalanan++;
                    // console.log({ perjalanan, sisikanan, sisikiri, perahu })
                    if (perahu.includes('P')) {
                        sisikiri.push(perahu[perahu.indexOf('P')])
                        perahu.splice(perahu.indexOf('P'), 1)
                    }
                } else {
                    let panjangP = sisikanan.filter((el) => el === 'P').length;
                    let panjangM = sisikanan.filter((el) => el === 'M').length;
                    if (panjangP === panjangM) {
                        perahu.push(sisikanan[sisikanan.indexOf('M')])
                        sisikanan.splice(sisikanan.indexOf('M'), 1)
                        perjalanan++;
                        // console.log({ perjalanan, sisikanan, sisikiri, perahu })
                        sisikiri.push(perahu[perahu.indexOf('M')])
                        perahu.splice(perahu.indexOf('M'), 1)
                    } else if (panjangP > panjangM) {
                        perahu.push(sisikanan[sisikanan.indexOf('P')])
                        sisikanan.splice(sisikanan.indexOf('P'), 1)
                        perjalanan++;
                        // console.log({ perjalanan, sisikanan, sisikiri, perahu })
                        sisikiri.push(perahu[perahu.indexOf('P')])
                        perahu.splice(perahu.indexOf('P'), 1)
                    }
                }

                if (sisikanan.length === 0) {
                    sisikiri.push(perahu[0])
                    perahu.splice(0, 1)
                    break
                }
                perjalanan++;
                // console.log({ perjalanan, sisikanan, sisikiri, perahu })

            }

            // console.log({ perjalanan: "akhir", sisikanan, sisikiri, perahu })

            console.log(bambang)
        }
        console.log(main(req.query.jumlah))
        res.render('index', { layout: 'layouts/main-layout', table: [] })
    } else {
        res.render('index', { layout: 'layouts/main-layout' })
    }


})


app.listen(port, () => console.log('> Server is up and running on port : ' + port))