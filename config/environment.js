const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db : 'NeroSocial_development',
    smtp : {
        service: 'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'shashwatksingh.27',
            pass: 'Sks79919072'
        }    
    },
    google_client_id: '157862504071-iaq8msbfcihdis03ggrk055aeiggi7m4.apps.googleusercontent.com',
    google_client_secret: 'fz8HDYktZtNluwYay8uEmZd2',
    google_callback_url: "http://localhost:800/users/auth/google/callback",
    jwt_secret : 'NeroSocial'
}

const production = {
    name : 'production' 
}
module.exports = development;