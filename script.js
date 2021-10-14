let body = document.querySelector("body");

let primaryDiv;

let NbrQuestions;
let ActualQuestion = 0;
let scorePlayer = 0;

let joueurSuivant = true;

let questionsArray = [];

let InitGame = () => {

    //Init des variables
    questionsArray = [];
    ActualQuestion = 0;
    scorePlayer = 0;
    joueurSuivant = true;

    //Création de la div principale
    let mainDiv = body.appendChild(document.createElement("div"));
    mainDiv.className = "container-fluid d-flex align-items-center justify-content-center text-center";
    primaryDiv = mainDiv;

    let divCenter = mainDiv.appendChild(document.createElement("div"));
    divCenter.className
    divCenter.appendChild(document.createElement("H2")).innerHTML = "Bienvenue dans le"; 
    divCenter.appendChild(document.createElement("H1")).innerHTML = "QUIZZ!!!"; 

    let buttonStart = divCenter.appendChild(document.createElement("button"));
    buttonStart.className = "btn btn-light btn-lg mt-4"
    buttonStart.innerHTML = "Commencer"

    buttonStart.onclick = () => {
        HowManyQuestions();
    }

}

let HowManyQuestions = () => {

    primaryDiv.remove();

    //Création de la div principale
    let mainDiv = body.appendChild(document.createElement("div"));
    mainDiv.className = "container-fluid d-flex align-items-center justify-content-center text-center";
    primaryDiv = mainDiv;

    //Création de l'input pour le nombre de questions
    let divCenter = mainDiv.appendChild(document.createElement("div"));
    let divNbreQuestions = divCenter.appendChild(document.createElement("h3")).innerHTML = "Choisissez le nombre de questions"; 
    let divInput = divCenter.appendChild(document.createElement("div"));
    divInput.className = "input-group input-group-lg";
    let inputNbreQuestions = divInput.appendChild(document.createElement("input"));
    inputNbreQuestions.type = "text";
    inputNbreQuestions.className = "form-control";
    let buttonNbreQuestions = divCenter.appendChild(document.createElement("button"));
    buttonNbreQuestions.className = "btn btn-light btn-lg mt-4";
    buttonNbreQuestions.innerHTML = "Valider"
    
    //Listerner sur le button
    buttonNbreQuestions.onclick = () => {
        if ( inputNbreQuestions.value != "" || inputNbreQuestions.value > 0)
        {
            if (Number.isInteger(parseInt(inputNbreQuestions.value)))
            {
                NbrQuestions = inputNbreQuestions.value;
                MakeAQuestion();
            }else{
                alert("Veuillez entrer uniquement un entier.");
            }

        }else{
            alert("Veuillez entrer un nombre de questions à poser.");
        }
        
    }
}

let MakeAQuestion = () => {

    primaryDiv.remove();

    let mainDiv = body.appendChild(document.createElement("div"));
    mainDiv.className = "container-fluid d-flex align-items-center justify-content-center text-center";
    primaryDiv = mainDiv;

    let divCenter = mainDiv.appendChild(document.createElement("div"));

    //Création des éléments
    if (NbrQuestions > 1)
    {
        divCenter.appendChild(document.createElement("p")).innerHTML = `${parseInt(ActualQuestion) + 1} / ${parseInt(NbrQuestions)}`;
        let divQuestionNbre = divCenter.appendChild(document.createElement("H2"));
        divQuestionNbre.innerHTML = `Ecrivez la question numéro ${parseInt(ActualQuestion) + 1}`; 
    }else
    {
        let divQuestionNbre = divCenter.appendChild(document.createElement("H2"))
        divQuestionNbre.innerHTML = `Ecrivez une question`; 
    }
  
    
    let H41 = divCenter.appendChild(document.createElement("H4"));
        H41.innerHTML = `Quel sera la question?`
        H41.className = "mt-4";
    let divInputQuestion = divCenter.appendChild(document.createElement("div"));
        divInputQuestion.className = "input-group input-group-lg p-2";
    let inputQuestion = divInputQuestion.appendChild(document.createElement("input"));
        inputQuestion.type = "text";
        inputQuestion.className = "form-control";

    let H42 = divCenter.appendChild(document.createElement("H4"))
        H42.innerHTML = `Quel sera la bonne réponse?`;
        H42.className = "mt-2";
    let divInputBonneReponse = divCenter.appendChild(document.createElement("div"));
        divInputBonneReponse.className = "input-group input-group-lg p-2";
    let inputBonneReponse = divCenter.appendChild(document.createElement("input"));
        inputBonneReponse.type = "text";
        inputBonneReponse.className = "form-control";

    let H43 = divCenter.appendChild(document.createElement("H4"));
        H43.innerHTML = `Quel sera la mauvaise réponse?`;
        H43.className = "mt-2";
    let divInputMauvaiseReponse = divCenter.appendChild(document.createElement("div"));
        divInputMauvaiseReponse.className = "input-group input-group-lg p-2";
    let inputMauvaiseReponse = divCenter.appendChild(document.createElement("input"));
        inputMauvaiseReponse.type = "text";
        inputMauvaiseReponse.className = "form-control";

    let buttonValidateQuestion = divCenter.appendChild(document.createElement("button"));
        buttonValidateQuestion.className = "btn btn-light btn-lg mt-4";
        buttonValidateQuestion.innerHTML = "Valider";

    //Listerner sur le button
    buttonValidateQuestion.onclick = () => {
        //Vérification des inputs
        if (inputQuestion.value != "" && inputBonneReponse.value != "" && inputMauvaiseReponse.value != ""){
            
            if (inputBonneReponse.value != inputMauvaiseReponse.value )
            {
                let newQuestion = {
                    question: inputQuestion.value,
                    bonnereponse : inputBonneReponse.value,
                    mauvaisereponse : inputMauvaiseReponse.value,
                    resultatjoueur : false
                }
    
                questionsArray.push(newQuestion);
                ActualQuestion++;
                if(ActualQuestion < NbrQuestions)
                {
                    MakeAQuestion();
                }else
                {
                    ActualQuestion = 0;
                    AskQuestions();
                }
            }else{
                alert("Veuillez noter des réponses différentes!");
            }
            

        }
        else{
            alert("Veuillez remplir tout les champs!");
        }
    }

}


let AskQuestions = () => {
    primaryDiv.remove();

    console.log(ActualQuestion);

    //Changement de joueur
    if (joueurSuivant)
    {
        let mainDiv = body.appendChild(document.createElement("div"));
        mainDiv.className = "container-fluid d-flex align-items-center justify-content-center text-center";
        primaryDiv = mainDiv;
    
        let divCenter = mainDiv.appendChild(document.createElement("div"));
        
        divCenter.appendChild(document.createElement("H2")).innerHTML = "Veulliez passer la main au joueur suivant";
        let buttonContinue = divCenter.appendChild(document.createElement("button"));
        buttonContinue.className = "btn btn-light btn-lg mt-4";
        buttonContinue.innerHTML = "Continuer";

        buttonContinue.onclick = () => {
            joueurSuivant = false;
            AskQuestions();
        }

    }
    else{  //Lancement des questions
        let mainDiv = body.appendChild(document.createElement("div"));
        mainDiv.className = "container-fluid d-flex align-items-center justify-content-center text-center";
        primaryDiv = mainDiv;
    
        let divCenter = mainDiv.appendChild(document.createElement("div"));

        divCenter.appendChild(document.createElement("p")).innerHTML = `${parseInt(ActualQuestion) + 1} / ${parseInt(NbrQuestions)}`;
        divCenter.appendChild(document.createElement("H2")).innerHTML = `Question ${parseInt(ActualQuestion) + 1}`;
        divCenter.appendChild(document.createElement("H3")).innerHTML = questionsArray[ActualQuestion].question;
        
        let reponseAleatoire = Math.random();
        console.log("random " + reponseAleatoire)
        let reponse1; 
        let reponse2;

        if (reponseAleatoire <= 0.5)
        {
            reponse1 = questionsArray[ActualQuestion].mauvaisereponse;
            reponse2 = questionsArray[ActualQuestion].bonnereponse;
        }else{
            reponse1 = questionsArray[ActualQuestion].bonnereponse;
            reponse2 = questionsArray[ActualQuestion].mauvaisereponse;
        }


        let buttonReponse1 = divCenter.appendChild(document.createElement("button"));
        buttonReponse1.className = "btn btn-light btn-lg m-3";
        buttonReponse1.innerHTML = reponse1;

        let buttonReponse2 = divCenter.appendChild(document.createElement("button"));
        buttonReponse2.className = "btn btn-light btn-lg m-3";
        buttonReponse2.innerHTML = reponse2;

        divCenter.appendChild(document.createElement("p")).innerHTML = "Choisissez une réponse";
    
        buttonReponse1.onclick = () => {
            CheckReponse(reponse1);
        }

        buttonReponse2.onclick = () => {
            CheckReponse(reponse2);
        }
        
    }

}

//Verification de la réponse
let CheckReponse = (reponse) => {

    if (reponse == questionsArray[ActualQuestion].bonnereponse)
    {
        scorePlayer++;
        questionsArray[ActualQuestion].resultatjoueur = true;
    }

    ActualQuestion++;

    if(ActualQuestion < questionsArray.length)
    {
        AskQuestions();
    }else{
        ShowResultats();
    }

}

//Affichage des résultats
let ShowResultats = () =>{
    primaryDiv.remove();
    
    let mainDiv = body.appendChild(document.createElement("div"));
    mainDiv.className = "container-fluid d-flex justify-content-center text-center";
    primaryDiv = mainDiv;

    let divCenter = mainDiv.appendChild(document.createElement("div"));
    divCenter.className = " m20";

    if (scorePlayer > 1)
    {
        divCenter.appendChild(document.createElement("h2")).innerHTML = `Bien joué! Votre score est de <b> ${scorePlayer} </b> bonnes réponses sur ${NbrQuestions} questions`;
    } else if (score = 1){
        divCenter.appendChild(document.createElement("h2")).innerHTML = `Votre score est de <b> ${scorePlayer} </b> bonne réponse sur ${NbrQuestions} questions`;

    } else if (score <= 0){
        divCenter.appendChild(document.createElement("h2")).innerHTML = `Dommage! Votre score est de ${scorePlayer} bonnes réponses sur ${NbrQuestions} questions`;
    }

    for (let i = 0; i < questionsArray.length; i ++){

        let divCard = divCenter.appendChild(document.createElement("div"));
        divCard.className = "card mt-4";

        let divCardHeader = divCard.appendChild(document.createElement("div"));
        divCardHeader.className = "card-header";

        let p1 = divCardHeader.appendChild(document.createElement("p"));
        p1.innerHTML = `Question ${i + 1} : ${questionsArray[i].question} `;
        p1.className = "fw-bold text-start text-dark";

        let divCardBody = divCard.appendChild(document.createElement("div"));
            divCardBody.className = "card-body";

        let p2 = divCardBody.appendChild(document.createElement("p"));
            p2.innerHTML = `Les réponses étaient : <span class= "text-success fw-bold"> ${questionsArray[i].bonnereponse} </span> ou  <span class= "text-danger fw-bold"> ${questionsArray[i].mauvaisereponse}  </span>` ;
            p2.className = "text-start text-dark";
        let p3 = divCardBody.appendChild(document.createElement("p"));

        if(questionsArray[i].resultatjoueur == true)
        {
            p3.innerHTML = `Vous avez trouvé la bonne réponse à cette question`;
            p3.className = "text-start text-success"
        }
        else
        {
            p3.innerHTML = `Vous n'avez pas trouvé la bonne réponse à cette question`;
            p3.className = "text-start text-danger"
        }
    }

    let buttonRecommencer = divCenter.appendChild(document.createElement("button"));
    buttonRecommencer.className = "btn btn-light btn-lg m-3";
    buttonRecommencer.innerHTML = "Recommencer une partie";

    buttonRecommencer.onclick = () => {
        primaryDiv.remove();
        
        InitGame();
    }
        


}