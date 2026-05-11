document.addEventListener('DOMContentLoaded', () => {
    const about = document.getElementById('about-content');
    if (!about) return;

    // 检查是否是手机端
    const isMobile = window.innerWidth <= 480;
    
    about.innerHTML = `
        <div class="about-page">
            <div class="about-title-wrapper">
                ${isMobile ? '<img class="about-title-avatar" src="photos/white.jpg" alt="Hongyang Fei">' : ''}
                <h1 class="about-title">About Me</h1>
            </div>

            <div class="about-layout">
                <div class="about-left">
                    <div class="about-bio glass-card">
                        <p>
                            I am a junior Software Engineering student at Nanjing University of Information Science and Technology.
                            Over the past three years, I have explored several research areas, including edge computing and recommender systems,
                            with one year of focused work on sparsity in on-device recommendation and the past six months devoted to LLM agents.
                            My current interests center around distilling and deploying agents on edge devices, as well as improving the efficiency,
                            automation, and scalability of agent workflows. I will graduate in Summer 2027 and am actively seeking graduate research opportunities.
                        </p>
                    </div>

                    <div class="project-grid">
                        <a class="project-card" href="#" target="_blank">
                            <span class="project-index">01</span>
                            <h2>On-device Recommendation</h2>
                            <p>Sparsity research for efficient recommendation on edge devices.</p>
                        </a>

                        <a class="project-card" href="#" target="_blank">
                            <span class="project-index">02</span>
                            <h2>LLM Agents</h2>
                            <p>Exploring agent workflows, automation, and deployment efficiency.</p>
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
x;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        border: 2px solid rgba(0, 242, 254, 0.3);
    }

    .about-title {
        font-size: clamp(1.8rem, 5vw, 2.5rem);
        margin: 0;
    }
}
</antml>
