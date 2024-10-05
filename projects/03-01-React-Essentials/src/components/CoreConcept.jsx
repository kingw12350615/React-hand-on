// use destructuring way to pass props
export default function CoreConcept({ image, title, description }) {
    return (
        <li>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    );
}

// use normal way to pass prop object
// function CoreConcept(prop){
//   return (
//     <li>
//       <img src={prop.image} alt={prop.title} />
//       <h3>{prop.title}</h3>
//       <p>{prop.dexcription}</p>
//     </li>
//   );
// }