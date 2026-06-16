document.addEventListener('DOMContentLoaded', () => {
    const research = document.getElementById('research-content');
    if (!research) return;
    
    research.innerHTML = `
        <div class="research-page">
            <h1 class="research-title">Research Experience</h1>

            <div class="research-section">
                <h2 class="section-heading">Timeline</h2>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <div class="timeline-period">June 2024 - December 2024</div>
                            <h3 class="timeline-title">Edge Computing Research</h3>
                            <p class="timeline-desc">Focused on optimizing computational efficiency and resource allocation in edge computing environments.</p>
                        </div>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <div class="timeline-period">January 2025 - April 2026</div>
                            <h3 class="timeline-title">Recommendation Systems Research</h3>
                            <p class="timeline-desc">Explored sparsity techniques and knowledge distillation for efficient on-device recommendation systems.</p>
                        </div>
                    </div>

                    <div class="timeline-item active">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <div class="timeline-period">April 2026 - Present</div>
                            <h3 class="timeline-title">Trustworthy AI & Agentic Systems</h3>
                            <p class="timeline-desc">My research interests center on trustworthy AI in agentic workflows, particularly large language model agents, retrieval-augmented generation, and the reliability of AI systems.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="research-section">
                <h2 class="section-heading">Publications & Achievements</h2>
                <div class="achievement-grid">
                    <a class="achievement-card" href="https://github.com/HongyangFei/MKD_Rec" target="_blank">
                        <span class="achievement-index">01</span>
                        <h3>On-device Recommendation</h3>
                        <p>Sparsity research for efficient recommendation on edge devices.</p>
                        <div class="achievement-meta">
                            <span class="meta-tag">Research Paper</span>
                            <span class="meta-tag">2025</span>
                        </div>
                    </a>
                </div>
            </div>

            <div class="research-section">
                <h2 class="section-heading">Academic Activities</h2>
                <div class="activity-list">
                    <div class="activity-card">
                        <div class="activity-icon">🎓</div>
                        <div class="activity-content">
                            <div class="activity-date">August 2025</div>
                            <h3 class="activity-title">AAAI Conference Volunteer</h3>
                            <p class="activity-desc">Volunteered at the AAAI Conference on Artificial Intelligence, assisting with conference organization and engaging with leading researchers in the field.</p>
                        </div>
                    </div>

                    <div class="activity-card">
                        <div class="activity-icon">📚</div>
                        <div class="activity-content">
                            <div class="activity-date">Ongoing</div>
                            <h3 class="activity-title">Research Seminars</h3>
                            <p class="activity-desc">Regular participation in AI and machine learning research seminars and reading groups.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
});
