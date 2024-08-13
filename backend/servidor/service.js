import axios from "axios";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


export function processRequest(model) {
    const params = ["5600", "7600", "5700", "5800", "7800", "7900"];
    return params.includes(model);
}

export async function requestScraping (model,price,range) {
    const SCRAPING_URL = `http://flask:5000/${model}`;
    try {
        const response = await axios.get(SCRAPING_URL);
        return formatRequestScraping(response.data,price,range);
    }
    catch(error) {
        return null;
    }
}

function parsePrice(priceString) {
    return parseFloat(priceString.replace(/\./g, '').replace(',', '.'));
}

function formatRequestScraping(data, price, range) {
    const minPrice = price - range;
    const maxPrice = price + range;
    const filteredData = data.filter(item => {
        const itemPrice = parsePrice(item.preco);
        return itemPrice >= minPrice && itemPrice <= maxPrice;
    });
    
    let resultString = '<h3>Resultados de pesquisa:</h3>';
    filteredData.forEach(item => {
        resultString += `<p>Processador: ${item.descricao}</p><p>Preco: ${item.preco}</p>`;
    });

    return resultString;
}


export async function sendMail(to, subject, text, name) {
    dotenv.config();
    const user = process.env.USER_EMAIL_API_KEY;
    const password = process.env.USER_PASSWORD_API_KEY

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: password
        }
    });

    const mailOptions = {
        from: user,
        to: to,
        subject: subject,
        html: `<h2>Olá ${name}, segue os seus resultados de pesquisa do preço dos processadores!</h2>
               ${text}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: ' + info.response);
        return info.response;
    } 
    catch (error) {
        console.error('Erro ao enviar e-mail: ' + error);
        throw error;
    }
}
