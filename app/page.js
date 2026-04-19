"use client";

import { useMemo, useState } from "react";

const businessOptions = [
  "Digital technology and AI",
  "Health and wellness",
  "E-commerce",
  "Home Based",
  "Consulting",
  "Other business type",
];

const channelOptions = ["Instagram", "WhatsApp", "Exhibitions", "Website"];

export default function Home() {
  const [brandName, setBrandName] = useState("");
  const [businessType, setBusinessType] = useState("Digital technology and AI");
  const [productIdea, setProductIdea] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([
    "Instagram",
    "WhatsApp",
  ]);

  const [goal, setGoal] = useState("");
  const [suggestedGoals, setSuggestedGoals] = useState([]);

  const [activeTab, setActiveTab] = useState("plan");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState("");

  const [dms, setDms] = useState("");
  const [saves, setSaves] = useState("");
  const [comments, setComments] = useState("");
  const [preorders, setPreorders] = useState("");

  const toggleChannel = (channel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const generateSuggestedGoals = () => {
    const idea = productIdea.toLowerCase();
    const audience = targetAudience.toLowerCase();
    const channelsText = selectedChannels.join(", ");
    const type = businessType.toLowerCase();
    const suggestions = [];

    if (!productIdea || !targetAudience || !businessType) {
      setSuggestedGoals([
        "Test customer interest before investing more resources.",
        "Compare two different value propositions or messages.",
        "Validate whether the current price range feels right.",
      ]);
      return;
    }

    suggestions.push(
      `Test whether ${productIdea} creates strong purchase interest among ${targetAudience}.`
    );

    if (type.includes("digital") || type.includes("ai")) {
      suggestions.push(
        `Validate whether the problem solved by ${productIdea} feels urgent enough for ${targetAudience}.`
      );
      suggestions.push(
        `Compare whether efficiency-focused messaging performs better than innovation-focused messaging for ${productIdea}.`
      );
    } else if (type.includes("health")) {
      suggestions.push(
        `Test whether trust-led messaging performs better than convenience-led messaging for ${productIdea}.`
      );
    } else if (type.includes("e-commerce")) {
      suggestions.push(
        `Validate whether the current offer and product positioning are strong enough to drive buying intent for ${productIdea}.`
      );
    } else if (type.includes("consulting")) {
      suggestions.push(
        `Test whether expertise-led positioning performs better than outcome-led positioning for ${productIdea}.`
      );
    } else if (type.includes("home")) {
      suggestions.push(
        `Test whether local and personal messaging performs better than broad value messaging for ${productIdea}.`
      );
    } else {
      suggestions.push(
        `Compare uniqueness-led messaging versus practicality-led messaging for ${productIdea}.`
      );
    }

    if (
      audience.includes("premium") ||
      audience.includes("luxury") ||
      priceRange.includes("90") ||
      priceRange.includes("100")
    ) {
      suggestions.push(
        `Validate whether premium positioning increases interest for ${productIdea}.`
      );
    } else {
      suggestions.push(
        `Test whether value-focused messaging performs better than uniqueness-focused messaging for ${productIdea}.`
      );
    }

    if (selectedChannels.length > 1) {
      suggestions.push(
        `Compare whether ${channelsText} generates stronger inquiries for ${productIdea}.`
      );
    } else {
      suggestions.push(
        `Test whether ${selectedChannels[0]} is the right validation channel for ${productIdea}.`
      );
    }

    if (priceRange) {
      suggestions.push(
        `Validate whether the price range (${priceRange}) creates interest or hesitation among ${targetAudience}.`
      );
    }

    setSuggestedGoals(suggestions.slice(0, 4));
    if (!goal && suggestions.length > 0) {
      setGoal(suggestions[0]);
    }
  };

  const handleGenerate = () => {
    if (suggestedGoals.length === 0) {
      generateSuggestedGoals();
    }
    setGenerated(true);
    setActiveTab("plan");
  };

  const plan = useMemo(() => {
    const idea = productIdea.toLowerCase();
    const audience = targetAudience.toLowerCase();
    const type = businessType.toLowerCase();

    let hypothesis =
      "Customers will respond positively if the offer is positioned clearly, linked to a real need, and presented with a strong reason to act.";

    if (type.includes("digital") || type.includes("ai")) {
      hypothesis =
        "Customers will respond most strongly if the offer is framed around solving a concrete problem faster, better, or with less effort.";
    } else if (type.includes("health")) {
      hypothesis =
        "Customers will respond best when the offer communicates trust, credibility, and a clear personal benefit.";
    } else if (type.includes("e-commerce")) {
      hypothesis =
        "Customers will respond more strongly when the product is positioned with clear value, strong differentiation, and low friction to purchase.";
    } else if (type.includes("consulting")) {
      hypothesis =
        "Customers will respond more strongly when the offer emphasizes specific outcomes and expertise rather than generic service descriptions.";
    } else if (idea.includes("handmade") || idea.includes("artisan")) {
      hypothesis =
        "Customers will respond most strongly to craftsmanship, uniqueness, and authenticity rather than generic messaging.";
    } else if (idea.includes("gift")) {
      hypothesis =
        "Customers will respond most strongly when the offer is framed around emotional value, presentation, and giftability.";
    } else if (audience.includes("premium") || audience.includes("luxury")) {
      hypothesis =
        "Customers will respond better to premium positioning, exclusivity, and quality cues than to price-driven messaging.";
    }

    const testPlan = goal
      ? `Primary validation objective: ${goal} Run a 5-day test using ${selectedChannels.join(
          " and "
        )}, track market signals, and compare which message, angle, or channel produces stronger buying intent.`
      : `Run a short validation sprint using ${selectedChannels.join(
          " and "
        )} to test interest in ${productIdea || "the offer"}.`;

    const angleA = {
      title: "Angle A — Clear value",
      body: `Position ${productIdea || "the offer"} as a relevant solution from ${
        brandName || "your brand"
      }, emphasizing the clearest practical or business value for ${
        targetAudience || "your audience"
      }.`,
    };

    const angleB = {
      title: "Angle B — Differentiation",
      body: `Present ${productIdea || "the offer"} as a distinctive alternative, focusing on what makes it different, memorable, or better than existing options.`,
    };

    const angleC = {
      title: "Angle C — Outcome or emotional appeal",
      body: `Frame ${productIdea || "the offer"} around the result it creates: confidence, ease, trust, growth, convenience, or peace of mind.`,
    };

    const instagramCaption = `Introducing ${
      productIdea || "our newest offer"
    } from ${brandName || "our brand"} — designed for ${
      targetAudience || "people who want a better solution"
    }. Clear value, strong positioning, and a reason to care. DM us to learn more.`;

    const whatsappMessage = `Hi! We’re testing interest in ${
      productIdea || "a new offer"
    } from ${brandName || "our brand"}. Would this be something you’d consider trying or buying? We’d love your quick feedback.`;

    const adStarter = `${brandName || "Your brand"} presents ${
      productIdea || "a new launch"
    } for ${targetAudience || "customers looking for a better option"}. Limited availability. Message us now to learn more.`;

    const signals = [
      "Purchase-intent messages",
      "Saves and shares",
      "Customer reactions or comments",
      "Repeated questions about pricing, fit, trust, delivery, or value",
      "Confirmed interest or pre-orders",
    ];

    const checklist = [
      "Choose 2 content or positioning angles to test this week",
      "Run both versions within 5 days",
      "Track messages, saves, comments, and high-intent responses",
      "Note repeated questions and objections",
      "Use the Learn tab to interpret results before deciding what to do next",
    ];

    return {
      hypothesis,
      testPlan,
      angles: [angleA, angleB, angleC],
      instagramCaption,
      whatsappMessage,
      adStarter,
      signals,
      checklist,
    };
  }, [
    brandName,
    businessType,
    productIdea,
    targetAudience,
    selectedChannels,
    goal,
  ]);

  const testStrategy = useMemo(() => {
    const idea = productIdea.toLowerCase();
    const audience = targetAudience.toLowerCase();
    const type = businessType.toLowerCase();

    let primaryChannel = selectedChannels[0] || "Instagram";
    let leadAngle = "Angle A — Clear value";
    let successMetric = "Purchase-intent messages";
    let experimentFormat =
      "Run two message variations over 5 days and compare which one generates stronger buying intent.";
    let whyItMatters =
      "This test will help identify whether the idea is attractive enough to move beyond passive interest and generate real market response.";

    if (selectedChannels.includes("Instagram")) {
      primaryChannel = "Instagram";
    } else if (selectedChannels.includes("WhatsApp")) {
      primaryChannel = "WhatsApp";
    } else if (selectedChannels.includes("Website")) {
      primaryChannel = "Website";
    } else if (selectedChannels.includes("Exhibitions")) {
      primaryChannel = "Exhibitions";
    }

    if (type.includes("digital") || type.includes("ai")) {
      leadAngle = "Angle A — Clear value";
      successMetric = "Purchase-intent messages";
      experimentFormat =
        "Test two versions of the offer: one focused on saving time and one focused on solving a painful problem.";
      whyItMatters =
        "Digital and AI offers usually perform best when the audience immediately understands the concrete value and urgency of the problem being solved.";
    } else if (type.includes("consulting")) {
      leadAngle = "Angle C — Outcome or emotional appeal";
      successMetric = "Purchase-intent messages";
      experimentFormat =
        "Compare expertise-led positioning versus outcome-led positioning and measure which one drives more inquiries.";
      whyItMatters =
        "Consulting offers are validated less by likes and more by whether prospects believe the service can create a valuable result.";
    } else if (type.includes("health")) {
      leadAngle = "Angle C — Outcome or emotional appeal";
      successMetric = "Confirmed interest / pre-orders";
      experimentFormat =
        "Test trust-led messaging against benefit-led messaging and observe which one reduces hesitation.";
      whyItMatters =
        "Health and wellness offers often depend on trust and perceived credibility before customers are ready to convert.";
    } else if (type.includes("e-commerce")) {
      leadAngle = "Angle B — Differentiation";
      successMetric = "Confirmed interest / pre-orders";
      experimentFormat =
        "Test one message focused on uniqueness and one focused on practical value, then compare which one drives stronger buyer intent.";
      whyItMatters =
        "E-commerce offers need both attention and conversion. This test helps identify what makes the product worth buying, not just noticing.";
    } else if (type.includes("home")) {
      leadAngle = "Angle B — Differentiation";
      successMetric = "Purchase-intent messages";
      experimentFormat =
        "Run a local or community-based validation test and compare a practical-value message with a trust or personal-touch message.";
      whyItMatters =
        "Home-based businesses often grow through trust and direct relationships, so the test should reveal which framing creates stronger response.";
    }

    if (idea.includes("gift")) {
      leadAngle = "Angle C — Outcome or emotional appeal";
      successMetric = "Content saves / shares";
    }

    if (audience.includes("premium") || audience.includes("luxury")) {
      successMetric = "Purchase-intent messages";
    }

    return {
      primaryChannel,
      leadAngle,
      successMetric,
      experimentFormat,
      whyItMatters,
    };
  }, [businessType, productIdea, targetAudience, selectedChannels]);

  const objectionRisks = useMemo(() => {
    const idea = productIdea.toLowerCase();
    const audience = targetAudience.toLowerCase();
    const type = businessType.toLowerCase();

    const risks = [];

    risks.push({
      title: "Clarity risk",
      description:
        "Customers may not immediately understand what the offer is, who it is for, or why it is worth paying attention to.",
      action:
        "Simplify the wording and make the value proposition more concrete in the first line of the message.",
    });

    if (priceRange) {
      risks.push({
        title: "Pricing risk",
        description: `The current price range (${priceRange}) may create hesitation if the value is not obvious enough.`,
        action:
          "Test stronger value framing, clearer outcomes, or social proof before changing the price itself.",
      });
    }

    if (type.includes("digital") || type.includes("ai")) {
      risks.push({
        title: "Problem urgency risk",
        description:
          "The audience may find the idea interesting, but not urgent enough to act on right now.",
        action:
          "Test messaging that highlights pain, wasted time, or what the user loses by not solving the problem.",
      });
    }

    if (type.includes("consulting")) {
      risks.push({
        title: "Trust and credibility risk",
        description:
          "Prospects may not yet believe the service can deliver meaningful results.",
        action:
          "Add examples, case outcomes, or stronger expertise-led framing in your test content.",
      });
    }

    if (type.includes("health")) {
      risks.push({
        title: "Trust and safety risk",
        description:
          "Customers may hesitate if the offer does not feel credible, safe, or professional enough.",
        action:
          "Test trust-led messaging, qualifications, testimonials, or reassurance-driven language.",
      });
    }

    if (type.includes("e-commerce") || idea.includes("product")) {
      risks.push({
        title: "Differentiation risk",
        description:
          "The product may not yet feel distinct enough from other available options.",
        action:
          "Test clearer differentiation by emphasizing what makes the offer unique, better, or more relevant.",
      });
    }

    if (audience.includes("premium") || audience.includes("luxury")) {
      risks.push({
        title: "Premium justification risk",
        description:
          "A premium audience may expect stronger quality, exclusivity, or proof before showing intent.",
        action:
          "Strengthen premium cues through quality language, positioning, and sharper brand framing.",
      });
    }

    return risks.slice(0, 4);
  }, [businessType, productIdea, targetAudience, priceRange]);

  const decision = useMemo(() => {
    const dmNum = Number(dms) || 0;
    const savesNum = Number(saves) || 0;
    const commentsNum = Number(comments) || 0;
    const preordersNum = Number(preorders) || 0;

    const score = dmNum * 3 + savesNum + commentsNum + preordersNum * 5;

    if (!generated) {
      return {
        label: "Awaiting test",
        reason:
          "Generate the validation workspace first, then enter your test results to get a recommendation.",
      };
    }

    if (score >= 35 || preordersNum >= 4 || dmNum >= 10) {
      return {
        label: "Scale",
        reason:
          "The idea shows strong customer intent. Increase visibility, prepare the next release or sales push, and continue with the strongest message angle.",
      };
    }

    if (score >= 15) {
      return {
        label: "Refine",
        reason:
          "There is promising interest, but not enough proof yet. Improve the message, visuals, offer, or target audience and test again.",
      };
    }

    return {
      label: "Pause",
      reason:
        "The current signals are weak. Reconsider the positioning, offer, or audience before investing more resources.",
    };
  }, [dms, saves, comments, preorders, generated]);

  const learningInsight = useMemo(() => {
    const dmNum = Number(dms) || 0;
    const savesNum = Number(saves) || 0;
    const commentsNum = Number(comments) || 0;
    const preordersNum = Number(preorders) || 0;

    let summary = "No validation signals have been entered yet.";
    let confidence = "Low";
    let nextStep =
      "Enter real or sample validation results so the tool can interpret what the market signals mean.";

    if (!generated) {
      return {
        summary,
        confidence,
        nextStep,
      };
    }

    if (preordersNum >= 4 || dmNum >= 10) {
      summary =
        "The strongest signal is direct buying intent. People are not only engaging with the idea, but are also showing concrete interest through high-intent messages or pre-orders. This suggests the concept is resonating beyond surface-level attention.";
      confidence = "High";
      nextStep =
        "Move forward with a stronger launch test, increase visibility, and prepare a small release, batch, or campaign based on the best-performing angle.";
      return { summary, confidence, nextStep };
    }

    if (savesNum >= 8 && dmNum < 5) {
      summary =
        "The idea appears to attract attention, but interest is still passive. People may find the concept appealing enough to save or revisit, but the current message is not yet converting that attention into strong buying intent.";
      confidence = "Medium";
      nextStep =
        "Keep the concept, but improve the positioning, call to action, or audience targeting. Then run another test focused on generating more inquiry.";
      return { summary, confidence, nextStep };
    }

    if (commentsNum >= 5 && dmNum < 4) {
      summary =
        "The offer is generating reactions, but not enough high-intent behavior yet. This can mean the idea is interesting, but customers may still be uncertain about fit, pricing, trust, or relevance.";
      confidence = "Medium";
      nextStep =
        "Review common reactions and objections, then refine the message or offer framing before investing further.";
      return { summary, confidence, nextStep };
    }

    if (dmNum >= 4 && preordersNum === 0) {
      summary =
        "There is real curiosity around the offer, but conversion remains weak. People are asking questions, which suggests the concept has potential, but they may still need stronger proof, clearer pricing, or better product-market fit.";
      confidence = "Medium";
      nextStep =
        "Refine the offer and remove friction. Test clearer pricing, stronger visuals, or a sharper value proposition.";
      return { summary, confidence, nextStep };
    }

    if (dmNum === 0 && savesNum === 0 && commentsNum === 0 && preordersNum === 0) {
      summary =
        "The current test did not produce meaningful market signals. This usually suggests that the offer, message, audience, or channel is not yet working well enough to trigger response.";
      confidence = "Low";
      nextStep =
        "Try a different positioning, a narrower audience, or a new validation channel before putting in more resources.";
      return { summary, confidence, nextStep };
    }

    summary =
      "The test shows weak or mixed validation signals. Some interest may be present, but there is not yet enough evidence to confidently scale the idea.";
    confidence = "Low";
    nextStep =
      "Run one more focused experiment with clearer messaging and a tighter target audience before deciding to continue or stop.";

    return { summary, confidence, nextStep };
  }, [dms, saves, comments, preorders, generated]);

  const copyText = async (label, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  const fillSampleResults = () => {
    setDms("7");
    setSaves("15");
    setComments("6");
    setPreorders("2");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            StyleSignal AI
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Validation workspace for boutique founders
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Turn business ideas into structured validation experiments, generate
            action-ready content, and make better decisions before investing
            more in marketing, sales, or delivery.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <SummaryCard title="Core activity" value="Validate business ideas" />
          <SummaryCard
            title="Selected channels"
            value={selectedChannels.join(", ")}
          />
          <SummaryCard title="Current decision" value={decision.label} dark />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Founder input</h2>
            <p className="mt-2 text-slate-600">
              Define what you want to test and generate a validation workspace.
            </p>

            <div className="mt-6 space-y-5">
              <Field
                label="Brand name"
                value={brandName}
                onChange={setBrandName}
                placeholder="e.g. Iva Boutique"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Business type
                </label>
                <div className="flex flex-wrap gap-2">
                  {businessOptions.map((option) => (
                    <ChoiceButton
                      key={option}
                      active={businessType === option}
                      onClick={() => setBusinessType(option)}
                    >
                      {option}
                    </ChoiceButton>
                  ))}
                </div>
              </div>

              <Area
                label="Offer, product, or service idea"
                value={productIdea}
                onChange={setProductIdea}
                placeholder="e.g. Personalized AI productivity assistant for students"
              />

              <Area
                label="Target audience"
                value={targetAudience}
                onChange={setTargetAudience}
                placeholder="e.g. Students who want a simpler way to manage deadlines and study plans"
              />

              <Field
                label="Price range"
                value={priceRange}
                onChange={setPriceRange}
                placeholder="e.g. €10–€30 per month"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Channels
                </label>
                <div className="flex flex-wrap gap-2">
                  {channelOptions.map((channel) => (
                    <ChoiceButton
                      key={channel}
                      active={selectedChannels.includes(channel)}
                      onClick={() => toggleChannel(channel)}
                    >
                      {channel}
                    </ChoiceButton>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    Suggested validation goals
                  </label>
                  <button
                    type="button"
                    onClick={generateSuggestedGoals}
                    className="rounded-full border border-slate-300 px-3 py-1 text-sm hover:bg-slate-100"
                  >
                    Suggest goals
                  </button>
                </div>

                {suggestedGoals.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                    Fill in the offer, audience, and business details, then
                    click <span className="font-medium">Suggest goals</span>.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {suggestedGoals.map((option) => (
                      <ChoiceButton
                        key={option}
                        active={goal === option}
                        onClick={() => setGoal(option)}
                      >
                        {option}
                      </ChoiceButton>
                    ))}
                  </div>
                )}

                {goal && (
                  <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span className="font-semibold">Selected goal:</span>{" "}
                    {goal}
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerate}
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:opacity-90"
              >
                Generate workspace
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {!generated ? (
              <div className="flex min-h-[760px] items-center justify-center text-center">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-700">
                    Workspace output
                  </h2>
                  <p className="mt-3 max-w-md leading-7 text-slate-500">
                    You will get a hypothesis, test plan, content suggestions,
                    signals to track, and an action checklist.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex gap-2">
                  <TabButton
                    active={activeTab === "plan"}
                    onClick={() => setActiveTab("plan")}
                  >
                    Plan
                  </TabButton>
                  <TabButton
                    active={activeTab === "test"}
                    onClick={() => setActiveTab("test")}
                  >
                    Run test
                  </TabButton>
                  <TabButton
                    active={activeTab === "learn"}
                    onClick={() => setActiveTab("learn")}
                  >
                    Learn
                  </TabButton>
                </div>

                {activeTab === "plan" && (
                  <div className="space-y-6">
                    <Panel title="Validation hypothesis">
                      <p className="leading-7 text-slate-700">
                        {plan.hypothesis}
                      </p>
                    </Panel>

                    <Panel title="AI-generated validation plan">
                      <p className="leading-7 text-slate-700">
                        {plan.testPlan}
                      </p>
                    </Panel>

                    <Panel title="AI-suggested test strategy">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="text-sm font-medium text-slate-500">
                            Recommended primary channel
                          </div>
                          <p className="mt-2 text-slate-700">
                            {testStrategy.primaryChannel}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="text-sm font-medium text-slate-500">
                            Best first angle to test
                          </div>
                          <p className="mt-2 text-slate-700">
                            {testStrategy.leadAngle}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="text-sm font-medium text-slate-500">
                            Main success signal
                          </div>
                          <p className="mt-2 text-slate-700">
                            {testStrategy.successMetric}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="text-sm font-medium text-slate-500">
                            Suggested experiment format
                          </div>
                          <p className="mt-2 leading-7 text-slate-700">
                            {testStrategy.experimentFormat}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                        <div className="text-sm font-medium text-slate-500">
                          Why this matters
                        </div>
                        <p className="mt-2 leading-7 text-slate-700">
                          {testStrategy.whyItMatters}
                        </p>
                      </div>
                    </Panel>

                    <Panel title="AI-predicted objection risks">
                      <div className="space-y-3">
                        {objectionRisks.map((risk) => (
                          <div
                            key={risk.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <h3 className="font-semibold">{risk.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {risk.description}
                            </p>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              <span className="font-medium">Suggested response:</span>{" "}
                              {risk.action}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Panel>

                    <Panel title="Angles to test">
                      <div className="space-y-3">
                        {plan.angles.map((angle) => (
                          <div
                            key={angle.title}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <h3 className="font-semibold">{angle.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {angle.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Panel>

                    <Panel title="Weekly action checklist">
                      <ul className="space-y-2">
                        {plan.checklist.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  </div>
                )}

                {activeTab === "test" && (
                  <div className="space-y-6">
                    <CopyPanel
                      title="Instagram caption"
                      text={plan.instagramCaption}
                      copied={copied}
                      onCopy={() =>
                        copyText("Instagram caption", plan.instagramCaption)
                      }
                    />
                    <CopyPanel
                      title="WhatsApp promo message"
                      text={plan.whatsappMessage}
                      copied={copied}
                      onCopy={() =>
                        copyText(
                          "WhatsApp promo message",
                          plan.whatsappMessage
                        )
                      }
                    />
                    <CopyPanel
                      title="Starter ad copy"
                      text={plan.adStarter}
                      copied={copied}
                      onCopy={() =>
                        copyText("Starter ad copy", plan.adStarter)
                      }
                    />
                    <Panel title="Signals to track">
                      <ul className="list-disc space-y-2 pl-5 text-slate-700">
                        {plan.signals.map((signal) => (
                          <li key={signal}>{signal}</li>
                        ))}
                      </ul>
                    </Panel>
                  </div>
                )}

                {activeTab === "learn" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">
                        Interpret your validation results
                      </h2>
                      <button
                        type="button"
                        onClick={fillSampleResults}
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
                      >
                        Try sample results
                      </button>
                    </div>

                    <Panel title="AI learning from market signals">
                      <div className="grid gap-4 md:grid-cols-2">
                        <MetricField
                          label="Purchase-intent messages"
                          helperText="Messages asking for price, availability, or how to buy"
                          value={dms}
                          onChange={setDms}
                        />
                        <MetricField
                          label="Content saves / shares"
                          helperText="Signals that people want to revisit or share the idea"
                          value={saves}
                          onChange={setSaves}
                        />
                        <MetricField
                          label="Customer reactions / comments"
                          helperText="Public reactions showing curiosity, preference, or hesitation"
                          value={comments}
                          onChange={setComments}
                        />
                        <MetricField
                          label="Confirmed interest / pre-orders"
                          helperText="The strongest signal that customers may actually buy"
                          value={preorders}
                          onChange={setPreorders}
                        />
                      </div>
                    </Panel>

                    <Panel title="AI insight summary">
                      <div className="space-y-4">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="text-sm font-medium text-slate-500">
                            Interpretation
                          </div>
                          <p className="mt-2 leading-7 text-slate-700">
                            {learningInsight.summary}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="text-sm font-medium text-slate-500">
                            Confidence level
                          </div>
                          <p className="mt-2 text-slate-700">
                            {learningInsight.confidence}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="text-sm font-medium text-slate-500">
                            Suggested next step
                          </div>
                          <p className="mt-2 leading-7 text-slate-700">
                            {learningInsight.nextStep}
                          </p>
                        </div>
                      </div>
                    </Panel>

                    <Panel title="Final recommendation">
                      <div className="rounded-2xl bg-slate-900 p-6 text-white">
                        <div className="text-sm uppercase tracking-wide text-slate-300">
                          Decision
                        </div>
                        <div className="mt-2 text-3xl font-bold">
                          {decision.label}
                        </div>
                        <p className="mt-3 leading-7 text-slate-100">
                          {decision.reason}
                        </p>
                      </div>
                    </Panel>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
      />
    </div>
  );
}

function Area({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
      />
    </div>
  );
}

function MetricField({ label, helperText, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {helperText && (
        <p className="mb-2 text-xs leading-5 text-slate-500">{helperText}</p>
      )}
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
      />
    </div>
  );
}

function ChoiceButton({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-slate-900 text-white"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-slate-900 text-white"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

function Panel({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
        {children}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, dark = false }) {
  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${
        dark
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className={`text-sm ${dark ? "text-slate-300" : "text-slate-500"}`}>
        {title}
      </div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

function CopyPanel({ title, text, copied, onCopy }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full border border-slate-300 px-3 py-1 text-sm hover:bg-slate-100"
        >
          {copied === title ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="leading-7 text-slate-700">{text}</p>
      </div>
    </div>
  );
}