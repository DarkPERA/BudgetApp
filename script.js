let profilesModule = (
    function () {
        let currentProfile;
        let profile_id_set = 1;

        let Profil = function (naziv, id) {  /*Profil objekat*/
            this.id = id;
            this.naziv = naziv;
            this.listaDohodaka = [];
            this.listaRashoda = [];
            this.ukudohodak = 0;
            this.ukurashod = 0;
            this.budzet = 0;
            this.dohodak_id_set = 0;
            this.rashod_id_set = 0;
        }

        let Dohodak = function (naziv, id, vrednost) {
            this.naziv = naziv;
            this.id = id;
            this.vrednost = vrednost;
        }
        let Rashod = function (naziv, id, vrednost) {
            this.naziv = naziv;
            this.id = id;
            this.vrednost = vrednost;
        }
        let sviProfili = [
            new Profil('Default', 0)
        ]; /*Lista svih profila*/

        currentProfile = sviProfili[0];
        function clacBudget() {
            currentProfile.ukudohodak = 0;
            currentProfile.ukurashod = 0;
            for (let i = 0; i < currentProfile.listaDohodaka.length; i++) {
                currentProfile.ukudohodak += currentProfile.listaDohodaka[i].vrednost;
            }
            for (let i = 0; i < currentProfile.listaRashoda.length; i++) {
                currentProfile.ukurashod += currentProfile.listaRashoda[i].vrednost;
            }
            currentProfile.budzet = currentProfile.ukudohodak - currentProfile.ukurashod;
        };

        return {
            addDohodak: function (naziv, vrednost) {
                currentProfile.listaDohodaka.push(new Dohodak(naziv, currentProfile.dohodak_id_set, vrednost));
                currentProfile.dohodak_id_set++;
                currentProfile.ukudohodak += vrednost;
                currentProfile.budzet = currentProfile.ukudohodak - currentProfile.ukurashod;
            },
            addRashod: function (naziv, vrednost) {
                currentProfile.listaRashoda.push(new Rashod(naziv, currentProfile.rashod_id_set, vrednost));
                currentProfile.rashod_id_set++;
                currentProfile.ukurashod += vrednost;
                currentProfile.budzet = currentProfile.ukudohodak - currentProfile.ukurashod;

            },
            stanje: function () {
                console.log('id: ' + currentProfile.id);
                console.log('naziv: ' + currentProfile.naziv);
                console.log('rashod_set: ' + currentProfile.rashod_id_set);
                console.log('dohodak_set: ' + currentProfile.dohodak_id_set);
                console.log('uku dokodak: ' + currentProfile.ukudohodak);
                console.log('uku rashod: ' + currentProfile.ukurashod);
                console.log('budzet: ' + currentProfile.budzet);
                console.log('lista dohodaka: ');
                for (let i = 0; i < currentProfile.listaDohodaka.length; i++) {
                    console.log('^^^^^^^^Dohodak' + i + '^^^^^^^^^^');
                    console.log('naziv: ' + currentProfile.listaDohodaka[i].naziv);
                    console.log('id: ' + currentProfile.listaDohodaka[i].id);
                    console.log('vrednost: ' + currentProfile.listaDohodaka[i].vrednost);

                }
                console.log('lista rashoda: ');
                for (let i = 0; i < currentProfile.listaRashoda.length; i++) {
                    console.log('^^^^^^^^Rashod' + i + '^^^^^^^^^^');
                    console.log('naziv: ' + currentProfile.listaRashoda[i].naziv);
                    console.log('id: ' + currentProfile.listaRashoda[i].id);
                    console.log('vrednost: ' + currentProfile.listaRashoda[i].vrednost);

                }
            },
            removeRashod: function (id) {
                for (let i = 0; i < currentProfile.listaRashoda.length; i++) {
                    if (currentProfile.listaRashoda[i].id == id) {
                        currentProfile.listaRashoda.splice(i, 1);
                    }
                }
                clacBudget();

            },
            removeDohodak: function (id) {
                for (let i = 0; i < currentProfile.listaDohodaka.length; i++) {
                    if (currentProfile.listaDohodaka[i].id == id) {
                        currentProfile.listaDohodaka.splice(i, 1);
                    }
                }
                clacBudget();
            },
            addProfile: function (naziv) {
                sviProfili.push(new Profil(naziv, profile_id_set));
                profile_id_set++;
                currentProfile = sviProfili[sviProfili.length - 1];
            },
            changeCurrent: function (id) {
                let i;
                for (let i = 0; i < sviProfili.length; i++) {
                    if (sviProfili[i].id == id)
                        indx = i;
                }
                currentProfile = sviProfili[indx];
            },
            removeProfile: function (id) {
                for (let i = 0; i < sviProfili.length; i++) {

                    if (sviProfili[i].id == id){
                        if (currentProfile.id == i) {
                            currentProfile = sviProfili[0];
                            sviProfili.splice(i, 1);
                        }
                    }
                        
                }
                


            },
            dohodakList: function () {
                return currentProfile.listaDohodaka;
            },
            rashodList: function () {
                return currentProfile.listaRashoda;
            },
            currentProfileInfoObj: function () {
                return currentProfile;
            },
            profileList: function(){
                return sviProfili;
            }
        };
    }
)();

let dataManipulation = (
    function (profileModule) {
        function stringMod(naziv, id, vrednost, tip) {
            let profile = " <div class='profile' id='profile-%id%'>\
            <div class='hidden'>\
                &raquo;\
            </div>\
           <button class='btn_name_value' id='profil_naziv'>\
            %naziv%\
           </button>\
           <button class='btn_profile_remove'>\
            &times;\
           </button>\
        </div>";

            let dohodak = "<div class='item_dohodak' id='Dohodak-%id%'>\
       <div class='name_dohodak'>%naziv%</div>\
       <div class='value_item_dohodak'>+ %vrednost%</div>\
       <button class='btn_dohodak'>✖</button>\
   </div>";


            let rashod = "<div class='item_rashod' id='Rashod-%id%'>\
       <div class='name_rashod'>%naziv%</div>\
       <div class='value_item_rashod'>- %vrednost%<div class='percentage_rashod'>%perc%</div></div>\
       <button class='btn_rashod'>✖</button>\
   </div>";
   let formatter = new Intl.NumberFormat('en');
            if (tip == 'Dohodak') {
                dohodak = dohodak.replace('%id%', id);
                dohodak = dohodak.replace('%naziv%', naziv);
                dohodak = dohodak.replace('%vrednost%', formatter.format(vrednost));
                return dohodak;
            }
            if (tip == 'Rashod') {
                rashod = rashod.replace('%id%', id);
                rashod = rashod.replace('%naziv%', naziv);
                rashod = rashod.replace('%vrednost%', formatter.format(vrednost));
                return rashod;
            }
            if (tip == 'profile') {
                profile = profile.replace('%id%', id);
                profile = profile.replace('%naziv%', naziv);
                return profile;
            }

        }
        return {
            readDohodak: function () {
                let lista = profileModule.dohodakList();
                for (let i = 0; i < lista.length; i++) {
                    document.querySelector('.items_dohodak').insertAdjacentHTML('beforeend', stringMod(lista[i].naziv, lista[i].id, lista[i].vrednost, 'Dohodak'));

                }

            },
            readRashod: function () {
                let lista = profileModule.rashodList();
                for (let i = 0; i < lista.length; i++)
                    document.querySelector('.items_rashod').insertAdjacentHTML('beforeend', stringMod(lista[i].naziv, lista[i].id, lista[i].vrednost, 'Rashod'))
            },
            clearAll: function () {
                document.querySelector('.items_dohodak').innerHTML = '';
                document.querySelector('.items_rashod').innerHTML = '';
            },
            readSingleDohodak: function () {
                let lista = profileModule.dohodakList();
                let zadnji = lista.length - 1;
                if (arguments[0] != undefined && arguments[0] < lista.length) {
                    zadnji = arguments[0];
                }
                document.querySelector('.items_dohodak').insertAdjacentHTML('beforeend', stringMod(lista[zadnji].naziv, lista[zadnji].id, lista[zadnji].vrednost, 'Dohodak'));
            },
            readSingleRashod: function () {
                let lista = profileModule.rashodList();
                let zadnji = lista.length - 1;
                if (arguments[0] != undefined && arguments[0] < lista.length) {
                    zadnji = arguments[0];
                }

                document.querySelector('.items_rashod').insertAdjacentHTML('beforeend', stringMod(lista[zadnji].naziv, lista[zadnji].id, lista[zadnji].vrednost, 'Rashod'));
            },
            insertProfile:function(){
                let profil = profileModule.currentProfileInfoObj();
                document.querySelector('.profile_section').insertAdjacentHTML('beforeend', stringMod(profil.naziv, profil.id, 0, 'profile'));
            },
            unlightProfile: function(){
                document.getElementById('profile-'+profileModule.currentProfileInfoObj().id).style.backgroundColor='tomato';
            },
            highlightProfile: function(){
                document.getElementById('profile-'+profileModule.currentProfileInfoObj().id).style.backgroundColor='#ff2903';
            },
            datumFormat:function(){
                let meseci = ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'];
                let tekst;
                let datum = new Date();
                tekst = datum.getDate()+'. '+ meseci[datum.getMonth()] + ' '+datum.getFullYear();
                document.querySelector('.datum').textContent = document.querySelector('.datum').textContent.replace('%date%',tekst);
            },
            displayInfo: function () {
                let budg;
                let formatter = new Intl.NumberFormat('en');
                if(( Math.floor(profileModule.currentProfileInfoObj().budzet * 100) / 100)>=0){
                    budg = '+ '+( formatter.format(Math.floor(profileModule.currentProfileInfoObj().budzet * 100) / 100)).toString();
                }
                else 
                budg =  Math.floor(profileModule.currentProfileInfoObj().budzet * 100) / 100;
                document.querySelector('.global_budzet').textContent = budg;
                document.querySelector('.dohodak .value').textContent ='+ '+ (formatter.format(Math.floor(profileModule.currentProfileInfoObj().ukudohodak * 100) / 100)).toString();
                document.querySelector('.rashod .value').textContent ='- '+ (formatter.format(Math.floor(profileModule.currentProfileInfoObj().ukurashod * 100) / 100)).toString();
                let perc = ((Math.floor(Math.round((profileModule.currentProfileInfoObj().ukurashod / profileModule.currentProfileInfoObj().ukudohodak) * 10000))) / 100).toString();
                if (isNaN(perc) || perc <= 0 || perc == 'Infinity') {
                    document.querySelector('.rashod .percentage').textContent = '0%';

                } else {
                    document.querySelector('.rashod .percentage').textContent = perc.toString() + '%';
                    if (profileModule.currentProfileInfoObj().ukurashod > profileModule.currentProfileInfoObj().ukudohodak)
                        document.querySelector('.rashod .percentage').textContent = '-' + document.querySelector('.rashod .percentage').textContent;
                }



                /*Update percentage rashode*/

                let percList = document.getElementsByClassName('percentage_rashod');
                if (percList.length >= 1) {
                    for (let i = 0; i < percList.length; i++) {
                        let id_nmbr = percList[i].parentNode.parentNode.id.split('-');
                        id_nmbr = parseFloat(id_nmbr[1]);
                        for (let j = 0; j < profileModule.rashodList().length; j++) {
                            if (profileModule.rashodList()[j].id == id_nmbr) {
                                if (((Math.floor(Math.round((profileModule.rashodList()[j].vrednost / profileModule.currentProfileInfoObj().ukudohodak) * 1000))) / 10).toString() == 'Infinity')
                                    percList[i].textContent = '0%';
                                else
                                    percList[i].textContent = ((Math.floor(Math.round((profileModule.rashodList()[j].vrednost / profileModule.currentProfileInfoObj().ukudohodak) * 10000))) / 100).toString() + '%';
                                if (profileModule.currentProfileInfoObj().ukurashod > profileModule.currentProfileInfoObj().ukudohodak && percList[i].textContent !== '0%') {
                                    percList[i].textContent = '-' + percList[i].textContent;
                                }
                            }
                        }

                    }
                }
            }
        };

    }
)(profilesModule);


let controllerModule = (

    function (profileModule, data) {
        function init() {


            data.datumFormat();
            data.highlightProfile();
            document.querySelector('select').addEventListener('change', function(){
                document.querySelector('select').classList.toggle('blue_focus');
                document.querySelector("input[name='vrednost']").classList.toggle('blue_focus');
                document.querySelector("input[name='naziv']").classList.toggle('blue_focus');
                document.querySelector("input[name='zapocni']").classList.toggle('blue_focus');
                document.querySelector("input[name='zapocni']").classList.toggle('btn_blue');

                document.querySelector('select').classList.toggle('red_focus');
                document.querySelector("input[name='vrednost']").classList.toggle('red_focus');
                document.querySelector("input[name='naziv']").classList.toggle('red_focus');
                document.querySelector("input[name='zapocni']").classList.toggle('red_focus');
                document.querySelector("input[name='zapocni']").classList.toggle('btn_red');
            });


            document.addEventListener('keyup', function (e) {
                if (e.key == 'Enter') {
                    read();
                }
            })
            document.querySelector("input[name='zapocni']").addEventListener('click', read);
            /*Implementiranje delete dohotka i rashoda*/
            document.querySelector('.items_dohodak').addEventListener('click', function (event) {

                if (event.target.className === 'btn_dohodak') {
                    deleteRasDoh(event.target);

                }
                else
                    console.log('false');
            });
            document.querySelector('.items_rashod').addEventListener('click', function (event) {
                if (event.target.className === 'btn_rashod') {
                    deleteRasDoh(event.target);
                }
                else
                    console.log('false');
            });
                /*Citava sekcija za 'add profile'*/
            document.querySelector('.profile').addEventListener('click', function(event){
              
                document.querySelector('.exit_creation').addEventListener('click',function(){
                    document.querySelector('.zamraci').style.display = 'none';
                    document.querySelector('.add_a_profile').style.display = 'none';
                    document.querySelector("input[name='profil_naziv']").value = '';
                });
                if(event.target.className == 'btn_profile_add' || event.target.id == 'add_profile'){
                    document.querySelector('.zamraci').style.display = 'block';
                    document.querySelector('.add_a_profile').style.display = 'block';
                    document.querySelector("input[name='profil_naziv']").value = '';

                    /*Event listener za dugme send*/
                    document.querySelector('.accept_profile').addEventListener('click',function(){
                        document.querySelector("input[name='profil_naziv']").value = document.querySelector("input[name='profil_naziv']").value.replace(/ /g,'');
                        
                        if(document.querySelector("input[name='profil_naziv']").value.length>1){
                            createAndLoad(document.querySelector("input[name='profil_naziv']").value);
                            document.querySelector('.zamraci').style.display = 'none';
                            document.querySelector('.add_a_profile').style.display = 'none';
                            document.querySelector("input[name='profil_naziv']").value = '';
                        }
                        else{
                           /* alert('Molimo dodajte naziv vasem profilu'); BUKVALNO U DRUGOM ITERATIONU SE AKTIVIRA IAKO SVE BUDE OKEJ*/
                        }
                       
                    });
                }

                
               
            });

            /*Sada odabir profila iz liste profila*/
            document.querySelector('.profile_section').addEventListener('click',function(event){
                /*Prvo selektovanje profila*/
                if(event.target.id == 'profil_naziv'){
                    let sadrzaj = event.target.parentNode.id.split('-');
                    data.unlightProfile();
                    profileModule.changeCurrent(sadrzaj[1]);
                    data.clearAll();
                    data.readDohodak();
                    data.readRashod();
                    data.displayInfo();
                    data.highlightProfile();
                }
                /*Sada brisanje profila*/
                if(event.target.className == 'btn_profile_remove'){
                    let profil = event.target.parentNode.id.split('-');
                    data.unlightProfile();
                    profileModule.removeProfile(profil[1]);
                    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
                    data.clearAll();
                    data.readDohodak();
                    data.readRashod();
                    data.displayInfo();
                    data.highlightProfile();
                }
            });

        }
        function createAndLoad(name_vrednost){
            data.unlightProfile();
            profileModule.addProfile(name_vrednost);
            data.clearAll();
            data.readDohodak();
            data.readRashod();
            data.displayInfo();
            data.insertProfile();
            data.highlightProfile();
        }
        function deleteRasDoh(obj) {
            let info = obj.parentNode.id.split('-');

            if (info[0] == 'Dohodak') {
                profileModule.removeDohodak(parseInt(info[1]));
                document.querySelector('.items_dohodak').removeChild(obj.parentNode);
            } else
                if (info[0] == 'Rashod') {
                    profileModule.removeRashod(parseInt(info[1]));
                    document.querySelector('.items_rashod').removeChild(obj.parentNode);
                }

            data.displayInfo();
        }
       

        /*Read input za dohodak i rashod*/
        function read() {
            let naziv = document.getElementById('naziv');
            let vrednost = document.getElementById('vrednost');
            let tip = document.querySelector('select').value;

            if (naziv.value.length <= 0 || naziv.value.length >= 15 || vrednost.value.length <= 0 || vrednost.value <= 0 || isNaN(vrednost.value)) {
                alert('Molimo unesite ispravne vrednosti');
            }
            else {
                if (tip == 'Dohodak') {
                    profileModule.addDohodak(naziv.value, parseFloat(vrednost.value));
                    data.readSingleDohodak();
                    naziv.value = '';
                    vrednost.value = '';
                    data.displayInfo();

                } else
                    if (tip == 'Rashod') {
                        profileModule.addRashod(naziv.value, parseFloat(vrednost.value));
                        data.readSingleRashod();
                        naziv.value = '';
                        vrednost.value = '';
                        data.displayInfo();
                    }
            }


        }
        return {
            initilize: function () {
                init();
            }
        };
    }
)(profilesModule, dataManipulation);



controllerModule.initilize();
