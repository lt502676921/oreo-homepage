import {
  Box,
  Container,
  Badge,
  Link,
  ListItem,
  UnorderedList,
  OrderedList
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Layout from '../../components/layouts/article'
import { Title, PostImage } from '../../components/post'
import P from '../../components/paragraph'
import CodeBlock from '../../components/code-block'

const Work = () => (
  <Layout title="">
    <Container>
      <Title>
        使用 Gemini Nano 为你的 Web 应用赋能 <Badge>2025</Badge>
      </Title>
      <P>
        Chrome AI
        的愿景简单而又远大：让Chrome和Web对所有开发者和所有使用者都更加智能。所有开发者是指任何技能等级的Web开发者、Chrome扩展程序开发者。无论你是否是人工智能专家，人工智能都应该易于使用。而所有用户则意味着让所有用户都能自由使用人工智能。而不仅仅是那些使用超高端设备和购买了高级服务的用户。
      </P>
      <P>
        2025年有一件事是肯定的，那就是AI无处不在，当AI无处不在时，它当然也会出现在Chrome中。本文将分成以下三个部分：
        <OrderedList ml={10} my={4}>
          <ListItem>介绍Builtin AI的概念</ListItem>
          <ListItem>浏览一遍所有的API</ListItem>
          <ListItem>一些新的有趣的能力</ListItem>
        </OrderedList>
      </P>

      <h1 style={{ fontSize: '20px', fontWeight: '700', padding: '10px 0' }}>
        介绍 Built-in AI
      </h1>

      <PostImage
        src="/images/posts/built-in-ai/thumbChromeAI.png"
        alt="Chrome AI"
      />

      <P>
        事实上，Chrome团队很早就内置了较小的专家模型在Chrome中，例如用于翻译和语言检测的模型。但也有一些不太明显的功能，例如通知提示预测，以阻止垃圾通知提示等。现在，Built-in
        AI的新功能是，在Chrome中新增了通用大语言模型，简称LLM。具体来说，它实际上是一个相对较小的LLM，名为Gemini
        Nano。与前面提到的较小的专家模型不同，Gemini
        Nano默认不被内置在Chrome浏览器中。一旦网页应用程序想要使用它，就会根据需要动态下载。没有被内置在Chrome中的原因是，虽然对于LLM来说，它很小，但他仍然是一个相对较大的资源。作为通用的LLM，Gemini
        Nano可以针对文字摘要、创意写作等特定任务进行优化，这是通过微调来实现的。结合专家模型、Gemini
        Nano和微调，Chrome向开发者提供了一套上层API。使浏览器能够将开发者的意图、最佳模型和针对当前任务的微调相匹配。这与使用WebGPU、WebNN来运行AI模型的底层方法是互补的。
      </P>

      <div style={{ height: '8px' }}></div>

      <P>
        Built-in AI的优势如下：
        <UnorderedList my={4}>
          <ListItem fontWeight={700}>敏感数据的本地处理</ListItem>
          <div style={{ textIndent: 0, marginLeft: '16px' }}>
            客户端 AI
            可以提升你的隐私保护能力。例如，如果你处理的是敏感数据，可以向用户提供采用端到端加密的
            AI 功能。
          </div>
          <ListItem fontWeight={700}>流畅的用户体验</ListItem>
          <div style={{ textIndent: 0, marginLeft: '16px' }}>
            在某些情况下，无需往返服务器即可提供近乎即时的结果。客户端 AI
            可以决定功能是否可行，以及用户体验是否理想。
          </div>
          <ListItem fontWeight={700}>更好地利用AI</ListItem>
          <div style={{ textIndent: 0, marginLeft: '16px' }}>
            用户设备可以承担部分处理负荷，从而更好地利用各项功能。例如，如果你提供高级
            AI 功能，则可以使用客户端 AI
            预览这些功能，以便潜在客户了解你产品的优势，而你无需支付额外费用。这种混合方法还有助于你管理推理费用，尤其是在经常使用的用户流程中。
          </div>
          <ListItem fontWeight={700}>离线使用 AI</ListItem>
          <div style={{ textIndent: 0, marginLeft: '16px' }}>
            即使没有网络连接，用户也可以使用 AI 功能。这意味着你的网站和 Web
            应用可以在离线状态下或在连接状况不稳定的情况下正常运行。
          </div>
        </UnorderedList>
      </P>

      <h1 style={{ fontSize: '20px', fontWeight: '700', padding: '10px 0' }}>
        浏览所有API
      </h1>

      <P>
        在深入探讨细节之前，先声明一下。部分API处于有限可用状态，已发布的API需要使用Chrome
        138以上的版本。
      </P>

      <h2 style={{ fontSize: '18px', fontWeight: '700', padding: '6px 0' }}>
        Prompting
      </h2>

      <P>
        首先是自由形式的Prompt API，针对Chrome扩展程序的版本已经在Chrome
        138中发布，针对Web侧API，需要使用Chrome
        128以后的版本，在flag中开启测试。Prompt API是用来测试开发者在使用 AI
        时想要用来做什么的试验场。作为自由形式的 API，你可以指示 Prompt API
        执行几乎任何LLM可以进行的操作。
      </P>

      <CodeBlock
        language={'javascript'}
        code={`// Prompt API 使用示例
const session = await LanguageModel.create();
const response = await session.prompt(
 "为一个五岁的孩子解释量子计算。"
);

/** 
好呀！想象一下你有一枚普通的硬币。它要么是正面，要么是反面，对吧？它只能是其中一个。
**量子计算有点像一个神奇的硬币！**
这个神奇的硬币可以同时是正面和反面！ 🤯 难以置信，对不对？ 它不是在旋转中，而是同时存在两种可能性！ 我们称这种神奇的硬币为 **“量子比特” (qubit)**。
普通的计算机使用 **“比特” (bit)** 来存储信息，比特要么是 0，要么是 1 (就像普通硬币的正面或反面)。 量子计算机用量子比特！
因为量子比特可以同时是 0 和 1，所以它可以尝试很多不同的答案，比普通计算机快得多！
[...]
**简单总结:**
* **比特 (bit):** 只能是 0 或 1，就像一个普通硬币。
* **量子比特 (qubit):** 可以同时是 0 和 1，就像一个神奇的硬币，可以同时是正面和反面！
* **量子计算:** 用量子比特来解决难题，比普通计算机快得多！
**/`}
      />

      <CodeBlock
        language={'javascript'}
        code={`// Prompt API for Chrome Extension 使用示例
const article = getArticleFromPage();
const session = await chrome.aiOriginTrial.LanguageModel.create();
const response = await session.prompt(
  \`为一个五岁的孩子解释这篇文章：\${article}\`
);`}
      />

      <h2 style={{ fontSize: '18px', fontWeight: '700', padding: '6px 0' }}>
        Writing
      </h2>

      <h3 style={{ fontSize: '16px', fontWeight: '700', padding: '4px 0' }}>
        Summarizer API
      </h3>

      <CodeBlock
        language={'javascript'}
        code={`const blogPost = document.querySelector('article').textContent;
const summarizer = await Summarizer.create({
 type: "headline",
 length: "short"
});
const headline = await summarizer.summarize(blogPost);
// "_Find inner peace amidst the noise; true happiness lies within._"`}
      />

      <h3 style={{ fontSize: '16px', fontWeight: '700', padding: '4px 0' }}>
        Writer API
      </h3>

      <CodeBlock
        language={'javascript'}
        code={`const writer = await Writer.create({ sharedContext });
const blogPost = await writer.write(
 "写一篇关于世界正在变得更好的文章"
);
// “世界正在改变：一些信号与进展...”`}
      />

      <h3 style={{ fontSize: '16px', fontWeight: '700', padding: '4px 0' }}>
        Rewriter API
      </h3>

      <CodeBlock
        language={'javascript'}
        code={`const rewriter = await Rewriter.create({
 sharedContext,
});
const rewrittenBlogPost = await rewriter.rewrite(blogPost, {
 tone: "less-formal"
})
// "世界正在不断发展：愿景与进展..."`}
      />

      <h2 style={{ fontSize: '18px', fontWeight: '700', padding: '6px 0' }}>
        Translating
      </h2>

      <h3 style={{ fontSize: '16px', fontWeight: '700', padding: '4px 0' }}>
        Language Detector API
      </h3>

      <CodeBlock
        language={'javascript'}
        code={`const languageDetector = await LanguageDetector.create();
const detectedLanguages = await languageDetector.detect(
 "今天发生了什么有趣的事儿？"
);
const detectedLanguage = detectedLanguages[0]
// {confidence: 0.9998757839202881, detectedLanguage: 'zh'}`}
      />

      <P style={{ textIndent: 0 }}>
        Language Detector 的 detect
        函数，返回一个语言检测对象数组，每个对象都包含置信度和检测到的语言。
        Language Detector API 与 Translator API 完美搭配，Translator API
        允许你将源语言翻译成目标语言。
      </P>

      <CodeBlock
        language={'javascript'}
        code={`const translator = await Translator.create({
 sourceLanguage: detectedLanguage,
 targetLanguage: "en"
});
const translation = await translator.translate(
 "今天发生了什么有趣的事儿？"
);
// "What interesting things happened today?"`}
      />

      <P style={{ textIndent: 0 }}>
        至此，我们浏览了所有的API，你发现了吗，所有实例都是平等创建的。从LanguageModel到Translator，它们都是通过一个
        create
        函数以相同的方式创建，在某些情况下，这个函数会接受一些可选参数。为了简洁起见，我在某几个代码示例中跳过了这一点。
      </P>

      <CodeBlock
        language={'javascript'}
        code={`await LanguageModel.create();
await Summarizer.create();
await Writer.create();
await Rewriter.create();
await LanguageDetector.create();
await Translator.create();`}
      />

      <P style={{ textIndent: 0 }}>
        刚才提到，Gemini
        Nano不会包含在Chrome本身中，需要动态下载，那么，我们是怎么知道用户侧的模型是否已经准备好？
        可用性函数有一个一致的方法。
      </P>

      <CodeBlock
        language={'javascript'}
        code={`await LanguageModel.availability();
await Summarizer.availability();
await Writer.availability();
await Rewriter.availability();
await LanguageDetector.availability();
await Translator.availability();`}
      />

      <P>
        <UnorderedList my={4}>
          <ListItem fontWeight={700}>
            如果用户侧不支持，它会响应 unavailable。
          </ListItem>
          <ListItem fontWeight={700}>
            当用户侧支持，并且模型可以下载时，它会响应 downloadable。
          </ListItem>
          <ListItem fontWeight={700}>
            正在下载时，它会响应 downloading。
          </ListItem>
          <ListItem fontWeight={700}>
            当模型已准备好时，它会响应 available。
          </ListItem>
        </UnorderedList>
        在这里，模型的状态是
        unavailable、downloadable、downloading、available。所有
        API的可用性函数的返回都保持一致。
      </P>

      <P style={{ textIndent: 0, marginTop: 8 }}>
        这些 API 的形态以及你刚刚看到的一致性，也源于 Chrome 团队在将这些 API
        孵化项目迁移到 W3C 的 Web 机器学习社区组时收到的反馈。 所有三个 API
        系列，即Prompt API、Writing API 和 Translating API，都包含在 Web
        机器学习社区组的章程中。
        Chrome团队正在与社区和其他浏览器供应商合作，使它们能够一致。
      </P>

      <Box my={4}>
        <PostImage
          src="/images/posts/built-in-ai/thumbCommunity.png"
          alt="Chrome AI"
        />
      </Box>

      <P>
        <UnorderedList my={4}>
          <ListItem fontWeight={700}>
            https://github.com/webmachinelearning/prompt-api
          </ListItem>
          <ListItem fontWeight={700}>
            https://github.com/webmachinelearning/writing-assistance-apis
          </ListItem>
          <ListItem fontWeight={700}>
            https://github.com/webmachinelearning/translation-api
          </ListItem>
        </UnorderedList>
      </P>

      <P style={{ textIndent: 0 }}>
        随着这些 API 的一致性工作顺利进行，在 Chrome 138 中已经发布首批
        API。具体来说，是如下API：
        <UnorderedList my={4}>
          <ListItem fontWeight={700}>Prompt API for Chrome Extension</ListItem>
          <ListItem fontWeight={700}>Summarizer API</ListItem>
          <ListItem fontWeight={700}>Translator API</ListItem>
          <ListItem fontWeight={700}>Language Detector API</ListItem>
        </UnorderedList>
      </P>

      <P style={{ textIndent: 0 }}>
        剩下两个 API 正在推进中，已经进入了Chrome 138版本的原始试用版：
        <UnorderedList my={4}>
          <ListItem fontWeight={700}>Writer API</ListItem>
          <ListItem fontWeight={700}>Rewriter API</ListItem>
        </UnorderedList>
      </P>

      <h1 style={{ fontSize: '20px', fontWeight: '700', padding: '10px 0' }}>
        新的能力
      </h1>

      <h2 style={{ fontSize: '18px', fontWeight: '700', padding: '6px 0' }}>
        Proofreader API
      </h2>

      <P>
        已经有很多开发者，都在尝试使用自由形式的Prompt
        API开展校对工作，当这件事的需求量增加时，这个能力就应该被抽象，Chrome团队针对这种任务对模型进行了微调，推出了Proofreader
        API。 通过Prompt API收集大家的需求，从而形成更细粒度的抽象，正是Prompt
        API的使命。Proofreader API可以在以下问题进行校对：
        <UnorderedList my={4}>
          <ListItem fontWeight={700}>拼写问题</ListItem>
          <ListItem fontWeight={700}>标点问题</ListItem>
          <ListItem fontWeight={700}>大小写问题</ListItem>
          <ListItem fontWeight={700}>介词问题</ListItem>
          <ListItem fontWeight={700}>漏掉某个单词</ListItem>
          <ListItem fontWeight={700}>语法问题</ListItem>
        </UnorderedList>
      </P>

      <CodeBlock
        language={'javascript'}
        code={`const text = 'Thsi Text have issues!';
// This [spelling] text [copitalization] has [grammar] issues!
const proofreader = await Proofreader.create({
 includeCorrectionTypes: true,
 includeCorrectionExplanations: true,
 expectedInputLanguages: ["en"]
})

const {corrections, corrected} = await proofreader.proofread(text);
console.log('Corrected version', corrected);
for (const correction of corrections) {
 console.log('Individual correction', correction);
}`}
      />

      <P>
        Proofreader 的 proofread
        函数，会返回一个包含详细更正对象的数组，以及完整的更正后的输入字符串。
      </P>

      <CodeBlock
        language={'json'}
        code={`{
 "corrected": "This text has issues!",
 "corrections": [
   {
     "startIndex": 0,
     "endIndex": 3,
     "correction": "This",
     "type": "spelling",
     "explanation": "The word 'This' had two transposed letters."
   },
   ...
 ]
}`}
      />

      <P style={{ textIndent: 0 }}>
        每个更正都有一个相对于输入字符串的起始索引、结束索引、实际的更正，以及更正类型和说明（取决于你是否选择了）。
      </P>

      <P style={{ textIndent: 0 }}>
        Proofreader API 可以在 Chrome 139 以上的版本中开启测试。 请访问{' '}
        <NextLink href="https://chrome.dev/web-ai-demos/proofreader-api-playground/">
          <Link>Proofreader Playground</Link>
        </NextLink>{' '}
        体验 Proofreader API 的强大能力。
      </P>

      <h2 style={{ fontSize: '18px', fontWeight: '700', padding: '6px 0' }}>
        Multimodal API
      </h2>

      <h3 style={{ fontSize: '16px', fontWeight: '700', padding: '4px 0' }}>
        Prompt API with image input
      </h3>

      <P>
        当 Prompt API 支持图像理解后，解锁了一些新的用例，例如让 AI
        描述一张图片。如果你运营一个博客平台，你可以让模型为已上传的图片提供替代文本建议，然后用户可以进行优化和调整。另一种情况是，根据产品图片获取产品描述，例如用于电商平台。或者，你可以使用该模型从图片中提取文本信息，例如从食谱扫描中提取信息以保存手写食谱集。该
        API 也继承了 Gemini 模型在OCR方面的强大能力。
      </P>

      <CodeBlock
        language={'javascript'}
        code={`const session = await LanguageModel.create({
 expectedInput: [{ type: "image" }]
});

const referenceImage = document.querySelector("img");
const userDrawnImage = document.querySelector("canvas");

const response = await session.prompt([
 "Give an artistic critique of how well the second image matches the first:",
 { type: "image", content: referenceImage },
 { type: "image", content: userDrawnImage }
]);
console.log(response);`}
      />

      <P>
        该能力支持接收任何视觉对象，从图像元素到图像块，再到图像位图、视频单帧或画布对象。
      </P>

      <P>
        请访问{' '}
        <NextLink href="https://chrome.dev/web-ai-demos/canvas-image-prompt/">
          <Link>Prompt API with image input Playground</Link>
        </NextLink>{' '}
        体验 Prompt API with image input 的强大能力。
      </P>

      <h3 style={{ fontSize: '16px', fontWeight: '700', padding: '4px 0' }}>
        Prompt API with audio input
      </h3>

      <P>
        假设你有一个在线播客录制应用，你可以使用 Prompt API
        创建转录建议，然后人工审核人员可以对其进行改进。如果你想添加音频片段的文本搜索，此API也非常有用。假设你有一个很长的播客，你想让用户搜索他们感兴趣的部分。另外你也可以对音频进行分类，例如，将音频文件按音乐风格分类。
      </P>

      <CodeBlock
        language={'javascript'}
        code={`const session = await LanguageModel.create({
 expectedInput: [{ type: "audio" }]
});

const audioBlob = await (await fetch("speech.mp3")).blob();

const response = await session.prompt([
 "Transcribe this speech:",
 { type: "audio", content: audioBlob },
]);
console.log(response);`}
      />

      <P>
        请访问{' '}
        <NextLink href="https://chrome.dev/web-ai-demos/mediarecorder-audio-prompt/">
          <Link>Prompt API with audio input Playground</Link>
        </NextLink>{' '}
        体验 Prompt API with audio input 的转录能力。
      </P>

      <P>
        带有图像理解的 Prompt API 和支持音频输入的 Prompt API 将在 Chrome 139
        中进入测试版本。
      </P>

      <P>
        Chrome团队还提供了内置的{' '}
        <NextLink href="https://chrome.dev/web-ai-demos/built-in-ai-playground/">
          <Link>AI Playground</Link>
        </NextLink>{' '}
        ，可以让你进一步探索所有的Built-in AI API。
      </P>

      <Box my={4}>
        <PostImage
          src="/images/posts/built-in-ai/thumbSummary.png"
          alt="Summary"
        />
      </Box>

      <P>
        最后，让我们回顾一下以上讨论的内容。 首先，四个API已经在Chrome 138
        中发布：用于 Chrome 扩展程序的Prompt API、Summarizer API、Language
        Detector API 和 Translater API。 用于 Web 的 Prompt
        API仍然处于测试状态。 其次，两个 API 移入 Origin Trail。即Writer API 和
        Rewriter API。 第三，三个全新的 API，可在flag中开启进行测试。
        它们分别是：支持图像输入的Prompt API、支持音频输入的Prompt API，以及
        Proofreader API。
      </P>

      <P>
        请查看 Built-in AI 最新进展：{' '}
        <NextLink href="https://developer.chrome.com/docs/ai/built-in">
          <Link>https://developer.chrome.com/docs/ai/built-in</Link>
        </NextLink>{' '}
      </P>

      <P style={{ margin: '8px 0 16px' }}>
        希望你可以享受使用 Built-in AI的乐趣。祝你编程愉快！
      </P>
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
