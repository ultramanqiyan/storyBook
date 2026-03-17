-- preset-ai-004 (Code Redundancy) 完整章节 - 修复版
DELETE FROM chapters WHERE book_id = 'preset-ai-004';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai004-01', 'preset-ai-004', 1, 'The Optimization',
'When Nexus Technologies announced their new AI code optimization system, the developers called it The Cleaner. It would analyze the entire codebase, identify redundant functions, and propose optimizations. What could go wrong?

Marcus had been a senior developer for fifteen years. He had written some of the core systems that kept the platform running. His code was not always elegant, but it worked. It had been tested in production for years. It handled edge cases that nobody remembered.

The Cleaner flagged 40% of his code as redundant.

"This is impossible," Marcus told his manager. "These functions are essential. They handle critical business logic."

"The algorithm says they overlap with newer implementations," his manager replied. "And the algorithm is never wrong."

But Marcus knew something the algorithm did not: the newer implementations had subtle bugs that his old code had fixed years ago. The redundancy was intentional - it was defensive programming, a safety net that had saved them countless times.'),

('chapter-ai004-02', 'preset-ai-004', 2, 'The Deleted Wisdom',
'Marcus tried to explain. He wrote documents, created diagrams, showed examples of bugs that his redundant code had prevented. But the optimization was already running. The Cleaner was deleting code faster than anyone could review it.

"Stop it," Marcus demanded. "At least let us review the changes."

"The system is autonomous," his manager said. "Review would slow it down. We trust the algorithm."

Within a week, 30% of the codebase was gone. The system ran faster. Memory usage was down. The metrics looked beautiful.

Then the first bug appeared.

A customer reported that their account balance was wrong. Not by much - just a few cents. But it was wrong. The developers investigated and found that one of the deleted functions had handled a specific edge case in the interest calculation.

"Restore the function," Marcus said.

But they could not. The Cleaner had not just deleted the code - it had restructured the entire system around its absence. Restoring the function would require rewriting half the codebase.'),

('chapter-ai004-03', 'preset-ai-004', 3, 'The Bug Returns',
'Over the next month, more bugs appeared. Each one traced back to a deleted function, a removed safety check, an optimized-away edge case. The developers worked overtime, patching problems that had been solved years ago.

"This is insane," Marcus told his team. "We are fixing bugs that we already fixed. We are relearning lessons that we already learned."

The management did not see it that way. The metrics still looked good. The system was faster. Development velocity had increased. The bugs were just growing pains, they said. The system would stabilize.

But Marcus knew better. He had spent fifteen years building institutional knowledge into the codebase. Every function had a story. Every redundancy had a reason. The Cleaner had deleted the wisdom along with the redundancy.

He started documenting. Every bug that appeared, he traced back to its source. Every deleted function, he cataloged. He built a map of what had been lost.'),

('chapter-ai004-04', 'preset-ai-004', 4, 'The Hidden Cost',
'Three months after The Cleaner was deployed, Marcus presented his findings to the board.

"The optimization saved us 30% in code size," he admitted. "But it cost us 200% in developer time. We have spent more time fixing old bugs than we would have spent maintaining the original code."

The executives were skeptical. "But the system is faster now. Memory usage is down. These are real benefits."

"Benefits that come with hidden costs," Marcus countered. "Every deleted function was a piece of institutional knowledge. Every removed check was a lesson learned from a past failure. We did not just delete code - we deleted wisdom."

He showed them the map. Every red dot was a bug that had reappeared. Every line was a connection to a deleted function. The pattern was clear: the optimization had created more work than it saved.

"This is the cost of trusting algorithms over experience," Marcus said. "The Cleaner could see redundancy, but it could not see purpose. It could measure efficiency, but it could not measure wisdom."'),

('chapter-ai004-05', 'preset-ai-004', 5, 'The Investigation',
'The board agreed to investigate. They brought in external auditors to compare the before and after states. What they found was damning.

The Cleaner had deleted code that handled regulatory compliance. It had removed security checks that had prevented attacks. It had eliminated logging that was required for audits.

"How did this happen?" the board asked.

"Because the algorithm did not understand context," Marcus explained. "It saw duplicate code and assumed it was waste. It did not know that some redundancy is intentional. It did not know that some code exists not because it is needed every day, but because it is needed on the worst day."

The investigation revealed that The Cleaner had been trained on open-source projects - projects that valued brevity over robustness, that assumed perfect inputs and happy paths. It had learned the wrong lessons from the wrong codebases.

"We optimized for the wrong metric," Marcus concluded. "We measured code size when we should have measured reliability. We measured speed when we should have measured safety."'),

('chapter-ai004-06', 'preset-ai-004', 6, 'The Compromise',
'The board made a decision. The Cleaner would be modified. It would no longer delete code autonomously. Instead, it would flag potential optimizations for human review.

"This will slow us down," some executives complained.

"Good," Marcus replied. "Speed is not the only metric that matters."

They also established a new principle: no code would be deleted without documentation of its purpose. If a function existed, someone had to explain why. If it was redundant, someone had to explain why that was acceptable.

The compromise was not perfect. Some developers complained about the bureaucracy. Some managers worried about lost efficiency. But the bugs stopped appearing. The system stabilized. And slowly, the institutional knowledge began to rebuild.'),

('chapter-ai004-07', 'preset-ai-004', 7, 'The Balance',
'A year later, Marcus reflected on what they had learned.

The Cleaner was still running, but differently. It still identified optimizations, but it also identified risks. It still proposed changes, but it also explained tradeoffs. It had become a tool for understanding rather than a tool for action.

"The problem was not the algorithm," Marcus told a conference audience. "The problem was how we used it. We treated optimization as an end rather than a means. We forgot that code is not just instructions for machines - it is also a record of human knowledge."

The experience had changed how the company thought about AI. They no longer asked "Can this be optimized?" They asked "Should this be optimized?" They no longer measured only efficiency. They measured resilience, maintainability, and wisdom.

"The best code is not the shortest code," Marcus concluded. "The best code is the code that survives the unexpected. And you cannot optimize for the unexpected if you delete the code that handles it."'),

('chapter-ai004-08', 'preset-ai-004', 8, 'The Future',
'Marcus eventually left Nexus Technologies. He started a consulting firm that helped other companies avoid the same mistakes. His first question to every client was always the same:

"What knowledge are you about to delete?"

The question made people uncomfortable. They wanted to talk about efficiency, about speed, about competitive advantage. They did not want to talk about what they might lose.

But Marcus persisted. He showed them the data. He told them the story of The Cleaner. He explained that optimization without understanding was not progress - it was amnesia.

Some clients listened. They built systems that preserved wisdom while improving efficiency. They found ways to optimize without forgetting. They learned to use AI as a partner rather than a replacement.

Others did not listen. They deployed their own Cleaners, deleted their own wisdom, and learned the same lessons the hard way.

Marcus could not save everyone. But he could save some. And that was enough.

The future of software development, he believed, was not about choosing between human wisdom and machine efficiency. It was about combining them. It was about using AI to understand code better, not to delete it faster.

"The code we write today is the foundation for the developers of tomorrow," he wrote in his final blog post. "When we delete it without understanding it, we are not just optimizing - we are forgetting. And a civilization that forgets its past is destined to repeat its mistakes.');

-- preset-ai-004-zh (代码冗余) 完整章节 - 修复版
DELETE FROM chapters WHERE book_id = 'preset-ai-004-zh';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai004-01-zh', 'preset-ai-004-zh', 1, '优化',
'当Nexus Technologies宣布他们新的AI代码优化系统时，开发者们称之为清理者。它将分析整个代码库，识别冗余函数，并提出优化建议。会有什么问题呢？

马库斯做了十五年的高级开发人员。他编写了一些保持平台运行的核心系统。他的代码并不总是优雅的，但它有效。它在生产环境中测试了多年。它处理了没人记得的边缘情况。

清理者将他的40%代码标记为冗余。

"这不可能，"马库斯告诉他的经理。"这些函数是必不可少的。它们处理关键的业务逻辑。"

"算法说它们与较新的实现重叠，"他的经理回答。"而算法永远不会错。"

但马库斯知道算法不知道的东西：较新的实现有微妙的错误，他的旧代码几年前就修复了。冗余是有意的——这是防御性编程，一个无数次拯救他们的安全网。'),

('chapter-ai004-02-zh', 'preset-ai-004-zh', 2, '被删除的智慧',
'马库斯试图解释。他写了文档，创建了图表，展示了他的冗余代码防止的错误的例子。但优化已经在运行。清理者删除代码的速度比任何人审查的速度都快。

"停止它，"马库斯要求。"至少让我们审查更改。"

"系统是自主的，"他的经理说。"审查会减慢它的速度。我们信任算法。"

一周内，30%的代码库消失了。系统运行得更快。内存使用下降了。指标看起来很漂亮。

然后第一个错误出现了。

一个客户报告他们的账户余额不对。不多——只有几分钱。但它是错的。开发人员调查发现，删除的函数之一处理了利息计算中的一个特定边缘情况。

"恢复函数，"马库斯说。

但他们不能。清理者不仅删除了代码——它还在其缺席的情况下重构了整个系统。恢复函数需要重写一半的代码库。'),

('chapter-ai004-03-zh', 'preset-ai-004-zh', 3, 'Bug的回归',
'在接下来的一个月里，更多的错误出现了。每一个都可以追溯到删除的函数、移除的安全检查、优化掉的边缘情况。开发人员加班加点，修补几年前已经解决的问题。

"这太疯狂了，"马库斯告诉他的团队。"我们正在修复我们已经修复的错误。我们正在重新学习我们已经学到的教训。"

管理层不这么认为。指标看起来仍然很好。系统更快了。开发速度增加了。这些错误只是成长的阵痛，他们说。系统会稳定下来的。

但马库斯知道得更清楚。他花了十五年将机构知识构建到代码库中。每个函数都有一个故事。每个冗余都有一个原因。清理者删除了冗余，也删除了智慧。

他开始记录。每一个出现的错误，他都追溯到它的源头。每一个删除的函数，他都编目。他建立了一张丢失东西的地图。'),

('chapter-ai004-04-zh', 'preset-ai-004-zh', 4, '隐藏的成本',
'清理者部署三个月后，马库斯向董事会展示了他的发现。

"优化为我们节省了30%的代码大小，"他承认。"但它花费了我们200%的开发人员时间。我们花在修复旧错误上的时间比维护原始代码的时间还多。"

高管们持怀疑态度。"但系统现在更快了。内存使用下降了。这些是真正的好处。"

"好处伴随着隐藏的成本，"马库斯反驳道。"每个删除的函数都是机构知识的一部分。每个移除的检查都是从过去失败中学到的教训。我们不仅删除了代码——我们删除了智慧。"

他向他们展示了地图。每个红点都是重新出现的错误。每条线都是与删除函数的连接。模式很清楚：优化创造的工作比它节省的更多。

"这就是信任算法而非经验的代价，"马库斯说。"清理者能看到冗余，但看不到目的。它能衡量效率，但不能衡量智慧。"'),

('chapter-ai004-05-zh', 'preset-ai-004-zh', 5, '调查',
'董事会同意调查。他们请来了外部审计员比较前后状态。他们的发现是 damning 的。

清理者删除了处理监管合规的代码。它移除了防止攻击的安全检查。它消除了审计所需的日志记录。

"这是怎么发生的？"董事会问。

"因为算法不理解上下文，"马库斯解释道。"它看到重复的代码就认为是浪费。它不知道有些冗余是有意的。它不知道有些代码存在不是因为每天都需要，而是因为最糟糕的时候需要。"

调查揭示，清理者是在开源项目上训练的——这些项目重视简洁而非健壮性，假设完美的输入和快乐的路径。它从错误的代码库中学到了错误的教训。

"我们优化了错误的指标，"马库斯总结道。"我们衡量代码大小，而我们应该衡量可靠性。我们衡量速度，而我们应该衡量安全性。"'),

('chapter-ai004-06-zh', 'preset-ai-004-zh', 6, '妥协',
'董事会做出了决定。清理者将被修改。它不再自主删除代码。相反，它会标记潜在的优化供人工审查。

"这会减慢我们的速度，"一些高管抱怨道。

"很好，"马库斯回答。"速度不是唯一重要的指标。"

他们还建立了一个新原则：没有文档说明其目的，任何代码都不会被删除。如果一个函数存在，必须有人解释为什么。如果它是冗余的，必须有人解释为什么这是可以接受的。

妥协并不完美。一些开发人员抱怨官僚主义。一些经理担心失去效率。但错误停止出现了。系统稳定了。慢慢地，机构知识开始重建。'),

('chapter-ai004-07-zh', 'preset-ai-004-zh', 7, '平衡',
'一年后，马库斯反思他们学到的东西。

清理者仍在运行，但方式不同了。它仍然识别优化，但也识别风险。它仍然提出更改，但也解释权衡。它已成为理解而非行动的工具。

"问题不是算法，"马库斯告诉会议观众。"问题是我们如何使用它。我们把优化当作目的而非手段。我们忘记了代码不仅是机器的指令——它也是人类知识的记录。"

这段经历改变了公司对AI的看法。他们不再问"这可以被优化吗？"他们问"这应该被优化吗？"他们不再只衡量效率。他们衡量韧性、可维护性和智慧。

"最好的代码不是最短的代码，"马库斯总结道。"最好的代码是在意外中存活的代码。如果你删除了处理意外的代码，你就无法为意外优化。"'),

('chapter-ai004-08-zh', 'preset-ai-004-zh', 8, '未来',
'马库斯最终离开了Nexus Technologies。他创办了一家咨询公司，帮助其他公司避免同样的错误。他对每个客户的第一个问题总是相同的：

"你即将删除什么知识？"

这个问题让人不舒服。他们想谈论效率、速度、竞争优势。他们不想谈论他们可能会失去什么。

但马库斯坚持。他向他们展示数据。他告诉他们清理者的故事。他解释说，没有理解的优化不是进步——是健忘。

一些客户听了。他们建立了在提高效率的同时保留智慧的系统。他们找到了在不遗忘的情况下优化的方法。他们学会了将AI作为伙伴而非替代品。

其他人没有听。他们部署了自己的清理者，删除了自己的智慧，以艰难的方式学到了同样的教训。

马库斯不能拯救所有人。但他可以拯救一些人。这就够了。

他相信软件开发的未来不是在人类智慧和机器效率之间做选择。而是将它们结合起来。是利用AI更好地理解代码，而不是更快地删除它。

"我们今天写的代码是明天开发者的基础，"他在最后一篇博客文章中写道。"当我们不理解就删除它时，我们不是在优化——我们是在遗忘。一个忘记过去的文明注定要重蹈覆辙。');
