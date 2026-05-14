document.addEventListener('DOMContentLoaded', () => {
    const about = document.getElementById('about-content');
    if (!about) return;
    
    about.innerHTML = `
        <div class="about-page">
            <div class="about-title-wrapper">
                <img class="about-title-avatar" src="photos/white.jpg" alt="Hongyang Fei">
                <h1 class="about-title">About Me</h1>
            </div>

            <div class="about-layout">
                <div class="about-left">
                    <div class="about-bio glass-card">
                        <p>
                            I am currently a junior Software Engineering student at Nanjing University of Information Science and Technology. 
                            I have spent half a year working on edge computing and one and a half years on recommender systems. 
                            My current research focuses on large language model agents, with particular interests in improving the efficiency, 
                            automation, and scalability of agent workflows.
                            In my spare time, I enjoy building projects with cutting-edge AI technologies. 
                            I am also interested in the trustworthiness of AI-generated responses and the safety of vibe coding.
                            I expect to graduate in Summer 2027 and am actively seeking graduate research opportunities.
                        </p>
                    </div>

                    <div class="project-grid">
                        <a class="project-card" href="https://github.com/HongyangFei/MKD_Rec" target="_blank">
                            <span class="project-index">01</span>
                            <h2>On-device Recommendation</h2>
                            <p>Sparsity research for efficient recommendation on edge devices.</p>
                        </a>

                        <a class="project-card" href="https://github.com/HongyangFei/CS2_Trading_Bot" target="_blank">
                            <span class="project-index">02</span>
                            <h2>CS2_Trading_Bot</h2>
                            <p>Monitor the CS market, send market change alerts, and execute automatic trading.</p>
                        </a>

                        <a class="project-card" href="#" target="_blank">
                            <span class="project-index">03</span>
                            <h2>Agent Distillation</h2>
                            <p>Distilling agent capabilities for lightweight edge intelligence.</p>
                        </a>
                    </div>
                </div>

                <div class="about-photo-wrap">
                    <img class="about-photo" src="photos/white.jpg" alt="Hongyang Fei">
                </div>
            </div>
        </div>
    `;
});
