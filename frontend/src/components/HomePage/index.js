import "./HomePage.css";


const HomePage = () => {
  return (
    <div>
      <picture>
        <source srcset="https://media.pitchfork.com/photos/5c76cde28a62e1373c013ebd/2:1/w_2560%2Cc_limit/SoundcloudRap.jpg" media="(min-width: 2000px)" />
        <img src="https://media.pitchfork.com/photos/5c76cde28a62e1373c013ebd/2:1/w_2560%2Cc_limit/SoundcloudRap.jpg" alt="" height='200' width='100%'/>
      </picture>
      <h2>Welcome to the cloud with sound!</h2>
    </div>
  )
}

export default HomePage;
