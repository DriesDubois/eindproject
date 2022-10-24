export function AboutPage (){
    const secret = process.env.REACT_APP_SECRET;
    return <p>about page van de site ${secret}</p>
}