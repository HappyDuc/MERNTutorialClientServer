const AboutPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">Professional Life</h1>
                <p className="text-gray-500 font-medium">I have experience in the service industry, working as a FOH team member at Nando's, this involved multi-roling during shifts as a grill-cook, food prep and waiting staff. Working there taught me a variety of key skills that I would need to progress professionally and I believe it was a highly beneficial role early in my life.</p>
                <p className="text-gray-500 font-medium">Other than Nando's I have also worked at a bike repair shop over the summers whilst not at university. During my time there I covered many different roles, including managing bike rentals, completing many different types of repairs and also being a part of the sales team advertising and demonstrating high value items (electric bikes, premium accessories, etc).</p>
            </div>
            <div className="flex gap-8">
                <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">Academics</h1>
                <p className="text-gray-500 font-medium">Having completed my secondary education I am currently attending Heriot-Watt University studying Computer Science and I have maintained an A grade average and I have also been awarded the Deputy Principal's Award for achieving Grade A, or equivalent, in six or more courses in a given year.</p>
                <p className="text-gray-500 font-medium">I would describe myself as having a deep, innate passion for computers and computation, having been interested in the inner workings for all of my life. I try to constantly have a "passion project" that I can work on in my free time to learn more about the topics it is pertinent to. In the past this has included getting a RaspberryPi and working with a breadboard to create simple software-&gthardware systems. More recently I worked on a dynamic route planner to (theoretically) navigate my university campus quickly, with plans to include real-time data to account for busy times of day. This website has also been a fun project for me, it has been very enjoyable to create a strictly planned site that takes advantage of the topics I have learned at university but with the freedom of it being my own.</p>
            </div>
            <div className="flex gap-8">
                <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">Personal Life</h1>
                <p className="text-gray-500 font-medium">Outside of my career and studies, I keep myself busy in a variety of ways; my flatmate and I are slowly making our way through a long list of "must-watch" movies that neither of us have seen. I am also deeply passionate about music, always exploring new genres and artists to broaden my taste. [Spotify Wrapped] I am also an avid gym-goer, it would probably be imprudent to call myself an amateur bodybuilder but I have spent over 2 years going to the gym 5 days a week and have made a lot of progress that I am very proud of [SBD: 120, 95, 140] as of 29/12/25. Finally, I thoroughly enjoy a wide array of video games, leaning most often towards realistic shooters and milsim games (War Thunder, Escape From Tarkov, etc) but also have a penchant for Minecraft, almost always heavily modded with tech mods, unsurprisingly I also quite enjoy Factorio. An honorable mention would be my love for Terraria, specifically the Calamity mod which I have beaten on a variety of difficulties.</p>
            </div>
        </div>
    );
};

export default AboutPage;
