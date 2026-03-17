-- Fix preset-ai-014 short chapters (expand to >1500 characters)
DELETE FROM chapters WHERE book_id = 'preset-ai-014' AND order_num IN (2,3,4,5,6,7,8);

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai014-02', 'preset-ai-014', 2, 'The Movement',
'Marcus did not stay quiet. Within weeks of losing his job, he had organized a meeting of other displaced workers. They gathered in a community center - former accountants, drivers, warehouse workers, customer service representatives - all united by the same experience of being rendered obsolete by automation.

"We are not alone," Marcus told the crowd. "There are millions of us. And we have been forgotten."

The meeting was the beginning of what would become known as the Displaced movement. At first, it was just a support group - people sharing their frustrations, their fears, their anger. But Marcus had bigger ambitions. He wanted to turn their collective pain into political power.

"The economy has changed," he said at a rally a few months later. "But the social contract has not. We were promised that if we worked hard, we would be taken care of. That promise has been broken. And we are here to demand a new one."

The movement grew quickly. The Displaced organized protests, lobbied politicians, and attracted media attention. They were not asking for handouts, they insisted - they were asking for recognition. They wanted the economy to value human contribution, not just efficiency.

But the response from the establishment was dismissive. Economists argued that automation was inevitable, that the displaced workers should retrain for new jobs. Politicians offered platitudes about the changing nature of work. Tech leaders spoke about the benefits of AI while ignoring the human costs.

"Their answer is always the same," Marcus told his followers. "Adapt or die. But what if we cannot adapt? What if there is nothing left to adapt to? What if the economy no longer needs us at all?"

The question hung in the air, unanswered. The Displaced movement had found its voice, but it was not yet clear whether anyone was listening. Marcus knew they needed to do more than protest - they needed to offer an alternative vision.

"We need to think bigger," he told a gathering of Displaced leaders. "Not just stopping change, but directing it. Not just protecting jobs, but redefining work. Not just demanding our old lives back, but building new lives that are worth living."

It was a harder sell than anger. But Marcus believed it was the only path forward. The world had changed, and they had to change with it - not by becoming more like the machines that had replaced them, but by becoming more human.'),

('chapter-ai014-03', 'preset-ai-014', 3, 'The Resistance',
'The Displaced movement faced opposition from multiple directions. Corporate interests saw them as a threat to progress. Politicians found them inconvenient. Even some workers who still had jobs viewed them with suspicion, fearing that association with the Displaced might make them targets for automation.

"They call us Luddites," Marcus said at a town hall meeting. "They say we are standing in the way of progress. But we are not against technology. We are against an economy that discards people like obsolete machinery."

The resistance took many forms. Some Displaced workers engaged in civil disobedience, blocking automated warehouses, protesting at tech company headquarters. Others worked within the system, lobbying for policies like universal basic income, job guarantees, and retraining programs. A few turned to more radical tactics, sabotaging automated systems in acts of digital vandalism.

Marcus walked a careful line between these factions. He understood the anger that drove the radicals, but he also knew that violence would only alienate potential allies. He pushed for constructive resistance - building alternatives while demanding change.

"We cannot burn down the future," he told a group that wanted to escalate. "But we can refuse to let the future burn us. We can organize, we can vote, we can create. We can show the world that humans still have value."

The movement began to attract allies from unexpected quarters. Some tech workers, worried about their own future displacement, joined the cause. Academics published studies on the social costs of automation. Religious leaders spoke about the dignity of work. Slowly, the conversation began to shift.

But progress was slow, and many Displaced workers were running out of time. They had mortgages to pay, families to support, lives to rebuild. The movement could not wait forever for the political system to respond.

"We need to create our own solutions," Marcus told his inner circle. "We cannot wait for the government to save us. We have to save ourselves."

The decision marked a turning point. The Displaced movement would no longer be just a protest - it would become a construction project, building a new economy from the ground up.'),

('chapter-ai014-04', 'preset-ai-014', 4, 'The New Economy',
'Marcus and a group of Displaced workers founded a cooperative - a business owned and operated by its workers. They called it "Human First" and focused on services that AI could not easily provide: elderly care, community building, creative arts, human connection.

The business struggled at first. They were competing against AI-powered services that could operate at lower cost. Their prices were higher, their processes slower, their margins thinner. Investors were skeptical, customers were scarce, and the media ignored them.

"We are not competing with AI," Marcus explained to a skeptical bank loan officer. "We are offering something different. AI can optimize processes, but it cannot care. It can analyze data, but it cannot empathize. It can follow protocols, but it cannot build relationships. We are selling what machines cannot provide."

The loan officer was unconvinced, but a community development fund saw potential. They provided seed money, and Human First began to grow.

What they discovered was that there was a market for humanity. People were hungry for connection in an increasingly automated world. Elderly clients preferred human caregivers who could listen to their stories. Parents valued human teachers who could understand their children''s unique needs. Communities wanted human organizers who could build genuine relationships.

"We are not just providing services," one worker said. "We are providing presence. And that is something people will pay for."

The cooperative grew. Other Displaced workers joined, bringing their skills and their desire to contribute. A new model of work began to emerge - not based on efficiency, but on humanity. Not based on automation, but on connection.

The success of Human First inspired others. Similar cooperatives sprang up across the country, each focusing on different aspects of human-centered work. A network formed, sharing resources, customers, and lessons learned. What had started as a protest movement was becoming an economic force.

Marcus watched it grow with a mixture of pride and caution. They had proven that humans still had value, that there was a place for people in the automated economy. But he knew that cooperatives alone could not solve the problem. The larger economy still needed to change.'),

('chapter-ai014-05', 'preset-ai-014', 5, 'The Recognition',
'Years later, Marcus''s cooperative was recognized as a model for the new economy. Politicians visited, journalists wrote profiles, academics studied their approach. The Displaced movement had evolved from protest to construction, from anger to innovation.

"What changed?" an interviewer asked Marcus on a national news program.

"We stopped trying to go back to the way things were," he said. "We realized that the old economy was not coming back. The jobs that were lost to automation were not coming back. But we also realized that we could build something better - an economy that valued human contribution, that distributed wealth more fairly, that recognized that efficiency is not the only measure of value."

"And what about the people who are still displaced? Who have not found their place in this new economy?"

"The work continues. We have not solved everything. There are still millions of people struggling, still communities devastated by automation. But we have shown that there is another way. That humans still have value. That the future does not have to leave us behind."

The recognition brought new opportunities. Marcus was invited to speak at conferences, to advise policymakers, to consult with companies trying to navigate the changing economy. He used every platform to advocate for the same message: technology should serve humanity, not replace it.

"The machines are here to stay," he told a gathering of business leaders. "But how we use them is our choice. We can use them to concentrate wealth and power, to make a few people very rich while discarding everyone else. Or we can use them to free humans for the work that matters - caring for each other, creating beauty, building community. The choice is ours."

The message resonated. More companies began to adopt human-centered approaches. More governments implemented policies to support displaced workers. The conversation had shifted, and Marcus had been at the center of that shift.

The interviewer nodded. Marcus smiled. He had found his place in the new world, not by competing with machines, but by being irreplaceably human.'),

('chapter-ai014-06', 'preset-ai-014', 6, 'The Legacy',
'Marcus grew old watching the economy transform. AI continued to advance, but the conversation had changed. People no longer talked about automation as inevitable progress; they talked about it as a choice that required human input, human values, human oversight.

The Displaced movement had become the Human Value movement, advocating for an economy that measured success not just in productivity, but in human flourishing. They had won some battles and lost others, but they had shifted the terms of the debate. The question was no longer "How can we automate this?" but "Should we automate this, and if so, how do we protect the people affected?"

Marcus''s cooperative had grown into a network of human-centered businesses employing thousands of people. His grandchildren worked there, carrying on the mission he had started. The world they inhabited was different from the one Marcus had known - more automated, but also more intentional about preserving space for human contribution.

"The machines are tools," Marcus told his grandchildren one evening. "They exist to serve us, not to replace us. Never forget that. Never let anyone tell you that you are obsolete. You have something that no machine can ever have: the capacity to care, to connect, to create meaning."

His grandchildren nodded. They had grown up in a world where humans and AI worked together, where the lessons of the Displaced had been absorbed into the culture. They could not imagine a world where people were simply discarded because they were no longer economically efficient.

"What was it like?" one grandchild asked. "Before? When people thought machines would replace everyone?"

"It was scary," Marcus admitted. "We did not know if we would have a place. We did not know if anyone would fight for us. But we learned that we had to fight for ourselves. And in fighting for ourselves, we fought for everyone."

That was Marcus''s legacy. Not just a cooperative, not just a movement, but a shift in how people thought about technology and humanity. He had helped build a world where being human was not a liability, but an asset.'),

('chapter-ai014-07', 'preset-ai-014', 7, 'The Future',
'The economy that Marcus had helped build was not perfect. There were still winners and losers, still people who struggled to find their place, still communities left behind by technological change. But there was also a recognition that human value was not just economic, that contribution came in many forms, that everyone deserved dignity.

The cooperative model had spread. Worker-owned businesses were now a significant part of the economy, particularly in sectors that required human connection. The government had implemented policies to support human-centered work: tax incentives for businesses that employed humans in meaningful roles, funding for care work, recognition of unpaid labor as economic contribution.

Marcus watched as a new generation of workers faced their own challenges. AI had not stopped evolving, and new forms of automation were emerging that threatened even the human-centered jobs the Displaced had created. But the conversation had changed. People were no longer asking whether they would be replaced; they were asking how they could contribute, what unique value they could bring.

That was the question that mattered. Not "Can a machine do this?" but "What can I do that matters?" The answer was different for everyone, but the question united them all.

"The future is not something that happens to us," Marcus wrote in his memoirs. "It is something we create. The machines will keep getting smarter, more capable, more efficient. But they will never be human. They will never care, never connect, never create meaning. That is our job. That has always been our job. And as long as we remember that, we will have a place in the world."

He looked out at the world he had helped shape - imperfect, unfinished, but moving in the right direction. The Displaced had found their place. And in doing so, they had made room for everyone.'),

('chapter-ai014-08', 'preset-ai-014', 8, 'Epilogue: The Human Economy',
'On his deathbed, Marcus was surrounded by family, friends, and fellow workers from the cooperative he had founded. A reporter asked if he would share what he had learned from his journey.

Marcus gathered his strength. His voice was weak, but his words were clear.

"That we are not defined by our jobs," he said. "We are defined by our humanity. The economy tried to tell us that we were only worth what we could produce. But we proved that we are worth more than that. We proved that human connection, human creativity, human care - these things have value that no machine can replicate."

"And the Displaced? What happens to them now?"

"We will always be with you. Every time technology advances, there will be people left behind. The question is not whether that will happen, but how you respond. Do you discard them? Or do you build a world where everyone has a place?"

His family gathered closer. They had built that world together - not perfectly, but persistently. They had shown that the future could include everyone, if people were willing to fight for it.

Marcus closed his eyes. He had started his journey as a displaced worker, a man who had lost his job to a machine and did not know where he fit in the new world. He had found a new place, a new purpose, a new way to contribute. And in doing so, he had helped build an economy that valued what made people human.

That was the rebellion worth fighting for.

THE END');
