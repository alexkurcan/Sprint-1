# SDLC Capstone — Sprint 1 Process Analysis  
Course: Software Quality Assurance  

Sprint: Sprint 1  

Model Selected: Waterfall (with some agile implementation)/Wagile  

Submission Type: Clickable link  

Due: End of class Thursday  

---

## Section 1 — Model Selection and Rationale

**Selected Model:** Waterfall  

**Rationale:**  
For the waterfall model, we had already been given predefined requirements that had to be met within our game. These requirements were non-negotiable; in addition to this, we had long, detailed documentation from the Valdation.md, CODE_STYLE.md, and BLOCKERS.md. Both of these reflect the waterfall model. Not to mention that once we had submitted a certain something, we were not allowed to go back or adjust anything that was in a past phase. The expectation that each part of the process would be clearly documented aligns strongly with a linear development structure.

However, our game development process was not solely a waterfall. It also reflected some characteristics of the SDLC Agile model. It had still worked within a defined sprint; our team collaborated on numerous occasions and resolved any issues that had been discovered without a totally defined testing phase. During the swapping phase, we had worked on iterative improvements instead of waiting until the very end of the project to deal with any bugs/testing. With these continuous adjustments and correlations, it shows how our project aligns with Agile while still maintaining strict documentation in addition to hard phase gates, we had iterated, responded to early feedback, and improved the product throughout the sprint.

---

## Section 2 — Phase Analysis

### Phase: Requirements

**What Sprint 1 produced:**  
In the beginning of the Sprint, we were assigned to create a game left to use our own creativity with very few restrictions. The requirements are team had to meet were that the game be easily playable on the school devices and to have proper documentation following a provided template. Normally, in a Waterfall model, these requirements would have been set first thing, which is what happened in our Sprint as well; however, there was a new requirement introduced later on in the sprint that called for three errors in our game.

**What strict adherence would have looked like:**  
If our Sprint strictly adhered to the Waterfall model, all our requirements would be fully set and known before any code is started. We would not have had to work around a new requirement late into the process. Although the three errors requirement was added late, we still used the Waterfall model because we had to go back and think about how to implement this new requirement, code it in, and test it. 

---

### Phase: Design

**What Sprint 1 produced:**  
After we received our requirements for this Sprint, we realized we were given much freedom to use our creativity and make a game. As a group, we had to come together with our ideas and make our own special game. We produced TickleThePickle, a Galaga-like game with Pickles as enemies and the user as a vampire. 

**What strict adherence would have looked like:**  
According to the Waterfall model, the design phase looks very similar to what we did, in coming up with an overall idea of what the game is, how it should look, and what it should include. The biggest difference would be that in the Waterfall model, the design phase would be done by a separate, specific team, unlike us, where we came up with the game idea as a group, with one main person behind the idea. 

---

### Phase: Implementation 

**What Sprint 1 produced:**  
Once the main idea for our game was decided, we began coding, with each one of us taking on different roles in the process. Overall, we all coded together, doing small tests in between. Producing a final product that had our contributions, but with one main person in charge of the coding. 

**What strict adherence would have looked like:**  
The Waterfall model calls for one specific team for coding. If we were to have followed the model strictly, we would have had only one of us focus on the coding; however, for efficiency, that did not work for us. Due to our team being only four people, we all had to help out in each phase because it would be too much work for only one person. 

---

### Phase: Testing

**What Sprint 1 produced:**  
For the testing phase, we were able to hand it off to a Quality Assurance team to test our game. The team came up with multiple errors in our game, which really helped us make our game better. The testing phase of our Sprint was very important to the final product because, after the testing phase, our team worked hard to fix all the issues and ended up with a much more dynamic and deployment-ready game. 

**What strict adherence would have looked like:**  
During the testing phase, we followed the Waterfall model, most like how it was meant to be followed. Just like the model, we had a specific team and phase for testing. The testing team being separate from our team, who were part of the development process, really helped us get errors that we would have never noticed. This phase gave us really good feedback about our game and helped make it much better. 

---

### Phase: Deployment

**What Sprint 1 produced:**  
The deployment phase of our game was our final deadline to have a fixed and ready game that is easily accessible and playable by others. We did that by deploying it through GitHub pages. We produced a game that anybody could access just by clicking on a link to it. 

**What strict adherence would have looked like:**  
This phase was also followed in the same way as the Waterfall model deployment phase calls for the final product to be produced and accessible to others. Ensuring a proper deployment where the game is accessible and allows for multiple users is very important in this phase, and by using GitHub pages to launch our game, we were able to successfully deploy our game according to the Waterfall model. 

---

### Phase: Maintenance

**What Sprint 1 produced:**  
Due to our game being on GitHub pages, there isnt much further maintenance required after launch. However, we still had to ensure that our link is still up and our repository is public and set up properly. As part of the maintenance process, we had to test our link on multiple devices and ensure it works. 

**What strict adherence would have looked like:**  
According to the Waterfall model, this phase would be an ongoing phase of testing the game and ensuring that nothing is causing it any issues or crashing. Due to games possibly being played by many people on different platforms and places, there could be multiple issues, such as the game crashing if too many people play at once. Maintenance ensures that the game runs smoothly, no matter what the users put it through. 

---

## Section 3 — Defect Case Studies

### Bug 1

**GitHub Issue:** (link the issue in markdown in github)  

**Description:**  
Upgrade Key “p” can not increase damage / allow you to shoot multiple projectiles. This was caused by an intentional error in our bug so that the QA team testing it can find it. 

**Phase that introduced the defect:**  
The planning phase of the Sprint 1 Week 1 timeframe introduced the bug because we had originally planned to include at least 3 bugs in the game and this bug was one of the planned out ones. 

**Phase that caught it:**  
The testing phase of Sprint 1 Week 2 timeframe found the bug, the QA team that worked on our program found the bug during this week and tested our game in search of bugs. 

**Would your chosen model have caught it earlier?:**  
Given that it was a bug done on purpose I’d say it would’ve yes. If the bug wasn’t included in the planning phase, the sprint development and review phase would’ve discovered the bug sooner. 

**Cost of catching it late:**  
Catching this bug in the testing phase required us to use more time fixing it rather than being able to focus on other aspects of the game. The cost of catching it late is our time and effort being taken up.

---

### Bug 2

**GitHub Issue:** (link the issue in markdown in github)

**Description:**  
Game does not end when the pickles get to the bottom of the screen. This was an unintentional bug that our team completely did not notice. The QA team found it in their testing phase of the project. 

**Phase that introduced the defect:**  
The development phase of Sprint 1 Week 1 timeframe introduced this error because we completely overlooked this issue and accidentally implemented it in the game while coding. The error didn’t even cross our minds while we were planning the structure and design of the game

**Phase that caught it:**  
The testing phase of Sprint 1 Week 2 found this issue, the QA team that worked on our program found the bug during this week by doing multiple edge case tests and trying to find what breaks our game’s logic and input. They let the pickles move down all the way to the bottom of the screen and noticed that the game wouldn’t end once they reached the player’s character.

**Would your chosen model have caught it earlier?:**  
Yes agile with phase gates could have caught this sooner, due to agile working in short sprints with continuous feedback and having clear requirements before passing each phase gate, the issue would’ve been found during the development phase before the testing gate (making sure all the edge cases pass). 

**Cost of catching it late:**  
The cost of catching it late was that we lost time and effort into fixing this issue we hadn’t even planned to have. We had to rework and revisit the game logic, we had to implement a border so that when the pickles reach the bottom of the screen the player loses. 

---

## Section 4 — QA Assessment

**How QA actually operated:**  
During Sprint 1, the QA portion had mainly been a part of the end of development, but not completely. After we had submitted our finished-enough build, another team tested our game within the second part of Sprint 1. They mainly focused on functionality and controls. And edge cases, intentionally trying to break the game in any way they could. This is how they were able to find our planned errors (i.e., enemies reaching the bottom of the screen and not ending the game), in addition to some UI changes that we needed to make. QA during this sprint had functioned as a late-phase game with some continuous feedback.  
During the project prior to part 2 (and after with regressions), our main goal with QA was just to make sure that the game ran before adding the international errors; this included testing, documenting any bugs/regressions (and how to duplicate them) that we had come across, and of course fixing them. It was more of a go-with-the-flow and what-works approach to QA.

**How that compares to your chosen model:**  
Usually under the waterfall model QA would only really start after implementation is fully complete and then handled off. Although we had structured testing, documentation, and this game was mainly based off of predefined requirements (loose ones, but still requirements). In our sport, QA mostly happened after development, which still aligns with waterfall. But, our process had included some agile characteristics since once defects were found we had quickly iterated and fixed them all while still within the same sprint. Rather than waiting for a future release cycle we had corrected the issues (including the ones we had created on purpose and the ones that the QA team had given to us) and immediately retested the game.  
Even though our structure was similar to waterfall in the phase order, the responsiveness to issues (and collaboration between testers and developers, as previously mentioned within section 1) reflected much more agile principles. Hence the hybrid.

**What QA would have looked like under strict adherence:**  
Under a strict waterfall approach, QA would have been separated from the development. All requirements would have been fully defined before getting to the coding portion. Not to mention a formal test plan would have been created directly from the requirements. Testing would only verify compliance (that it works) with the documented requirements. If it hadn’t worked with said requirements, then it would go through formal documentation, reassignment, correcting the issue, and then re-testing it. There wouldn’t be any sort of quick back and forth fixing during the same sprint; it would process much more documentation obtained that we had within sprint 1.

---

## Section 5 — Team Retrospective on Process

**The gap:**  
The biggest gap between how Sprint 1 actually ran and how it would have run under strict Scrum was that we did not have clearly defined roles for each team member. Everyone was kind of just doing whatever they wanted, and that caused a lot of overlap. Some people ended up working on the same things without even knowing it, while other tasks got completely ignored because everyone assumed someone else was handling them.

**What it cost the team:**  
On the first day of our game development phase, one major issue caused us to lose all of our progress and data. Because we did not have a proper system for saving and sharing our work, nobody had a backup. If we had been following Scrum correctly, we would have had daily check-ins where someone would have caught this problem way earlier. Instead, we had to restart a big chunk of our work, which wasted a lot of time and made our team pretty frustrated.

**The one change for Sprint 2:**  
If we were to use the Waterfall Method more strictly, our plans could have been a lot more organized from the very beginning. The one change that would have made the biggest difference is creating a clear step-by-step plan before anyone started working. In Waterfall, you finish one phase completely before moving to the next, so if we had done that, everyone would have known exactly what to do and when to do it. That alone probably would have prevented most of the confusion we dealt with in Sprint 1.

---

## Contributors

| Name      | Section Led        |
|-----------|-------------------|
| Alex      | Section 1 & 4     |
| Melo      | Section 3         |
| Sham      | Section 2         |
| Elizabeth | Section 5         |
