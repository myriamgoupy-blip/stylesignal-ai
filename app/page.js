"use client";

import { useMemo, useState } from "react";

const businessOptions = [
  "Boutique fashion brand",
  "Handmade gifts brand",
  "Home decor brand",
  "Beauty / wellness boutique",
  "Other boutique brand",
];

const channelOptions = ["Instagram", "WhatsApp", "Exhibitions", "Website"];

const goalOptions = [
  "Test customer interest before producing more",
  "Compare 2 product styles or messages",
  "Validate pricing and demand",
  "Decide whether to scale or refine",
];

export default function Home() {
  const [brandName, setBrandName] = useState("");
  const [businessType, setBusinessType] = useState("Boutique fashion brand");
  const [productIdea, setProductIdea] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([
    "Instagram",
    "WhatsApp",
  ]);
  const [goal, setGoal] = useState(goalOptions[0]);
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

  const plan = useMemo(() => {
    const idea = productIdea.toLowerCase();
    const audience = targetAudience.toLowerCase();
    const channelsText = selectedChannels.join(", ");

    let hypothesis =
      "Customers will respond positively if the product is positioned clearly, with a strong reason to care and an easy path to inquire.";

    if (idea.includes("handmade") || idea.includes("artisan")) {
      hypothesis =
        "Customers will respond most strongly to craftsmanship, uniqueness, and authenticity rather than generic trend language.";
    } else if (idea.includes("gift")) {
      hypothesis =
        "Customers will respond most strongly when the product is framed around emotional value, presentation, and giftability.";
    } else if (audience.includes("premium") || audience.includes("luxury")) {
      hypothesis =
        "Customers will respond better to premium positioning, exclusivity, and quality cues than to price-driven messaging.";
    } else if (idea.includes("jeans") || idea.includes("clothing")) {
      hypothesis =
        "Customers will respond more strongly when the product is framed around fit, confidence, and distinctive style rather than only functionality.";
    }

    const testPlan = selectedChannels.includes("Instagram")
      ? `Run a 5-day validation sprint on Instagram using two different content angles for ${productIdea || "the product"}, then follow up strong responses through WhatsApp.`
      : `Run a short validation sprint across ${channelsText} using two message variations and compare which one generates stronger purchase intent.`;

    const angleA = {
      title: "Angle A — Uniqueness",
      body: `Position ${productIdea || "the product"} as a distinctive offer from ${
        brandName || "your brand"
      }, emphasizing what makes it different, memorable, and worth noticing.`,
    };

    const angleB = {
      title: "Angle B — Practical value",
      body: `Present ${productIdea || "the product"} as a useful and relevant option for ${
        targetAudience || "your audience"
      }, focusing on fit, convenience, and everyday value.`,
    };

    const angleC = {
      title: "Angle C — Emotional appeal",
      body: `Frame ${productIdea || "the product"} around the feeling it creates: confidence, self-expression, thoughtfulness, joy, or belonging.`,
    };

    const instagramCaption = `Introducing ${
      productIdea || "our newest product"
    } from ${brandName || "our brand"} — designed for ${
      targetAudience || "customers who value quality and originality"
    }. Thoughtful, distinctive, and made to stand out. DM us to learn more.`;

    const whatsappMessage = `Hi! We’re testing interest in ${
      productIdea || "a new product"
    } from ${brandName || "our brand"}. Would this be something you’d consider buying? We’d love your quick feedback.`;

    const adStarter = `${brandName || "Your brand"} presents ${
      productIdea || "a new launch"
    } for ${targetAudience || "customers looking for something distinctive"}.
Limited availability. Message us now to learn more.`;

    const signals = [
      "Direct inquiries or DMs",
      "Saves and shares",
      "Comments expressing strong interest",
      "Repeated questions about price, fit, size, delivery, or customization",
      "Pre-orders or clear buying intent",
    ];

    const checklist = [
      "Choose 2 content angles to test this week",
      "Post both versions within 5 days",
      "Track DMs, saves, comments, and pre-orders",
      "Note repeated questions and objections",
      "Decide whether to scale, refine, or pause",
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
  }, [brandName, productIdea, targetAudience, selectedChannels]);

  const decision = useMemo(() => {
    const dmNum = Number(dms) || 0;
    const savesNum = Number(saves) || 0;
    const commentsNum = Number(comments) || 0;
    const preordersNum = Number(preorders) || 0;

    const score = dmNum * 3 + savesNum + commentsNum + preordersNum * 5;

    if (!generated) {
      return {
        label: "Awaiting test",
        reason: "Generate the validation plan first, then enter test results to get a recommendation.",
      };
    }

    if (score >= 35 || preordersNum >= 4 || dmNum >= 10) {
      return {
        label: "Scale",
        reason:
          "The idea shows strong customer intent. Increase visibility, prepare more inventory, and continue with the strongest message angle.",
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
        "The current signals are weak. Reconsider the positioning, the product concept, or the audience before investing more resources.",
      };
  }, [dms, saves, comments, preorders, generated]);

  const handleGenerate = () => {
    setGenerated(true);
    setActiveTab("plan");
  };

  const copyText = async (label, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch (e) {
      console.error(e);
    }
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
            Turn product ideas into structured validation experiments, generate action-ready content,
            and make better decisions before investing more in production or marketing.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <SummaryCard title="Core activity" value="Validate product ideas" />
          <SummaryCard title="Selected channels" value={selectedChannels.join(", ")} />
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
                label="Product idea"
                value={productIdea}
                onChange={setProductIdea}
                placeholder="e.g. Handmade festive dress collection"
              />

              <Area
                label="Target audience"
                value={targetAudience}
                onChange={setTargetAudience}
                placeholder="e.g. Women 20–35 looking for premium occasion wear"
              />

              <Field
                label="Price range"
                value={priceRange}
                onChange={setPriceRange}
                placeholder="e.g. €50–€90"
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Goal
                </label>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((option) => (
                    <ChoiceButton
                      key={option}
                      active={goal === option}
                      onClick={() => setGoal(option)}
                    >
                      {option}
                    </ChoiceButton>
                  ))}
                </div>
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
                  <h2 className="text-2xl font-semibold text-slate-700">Workspace output</h2>
                  <p className="mt-3 max-w-md leading-7 text-slate-500">
                    You will get a hypothesis, test plan, content suggestions, signals to track,
                    and an action checklist.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex gap-2">
                  <TabButton active={activeTab === "plan"} onClick={() => setActiveTab("plan")}>
                    Plan
                  </TabButton>
                  <TabButton active={activeTab === "test"} onClick={() => setActiveTab("test")}>
                    Test
                  </TabButton>
                  <TabButton active={activeTab === "learn"} onClick={() => setActiveTab("learn")}>
                    Learn
                  </TabButton>
                </div>

                {activeTab === "plan" && (
                  <div className="space-y-6">
                    <Panel title="Validation hypothesis">
                      <p className="leading-7 text-slate-700">{plan.hypothesis}</p>
                    </Panel>

                    <Panel title="Recommended test plan">
                      <p className="leading-7 text-slate-700">{plan.testPlan}</p>
                    </Panel>

                    <Panel title="Angles to test">
                      <div className="space-y-3">
                        {plan.angles.map((angle) => (
                          <div key={angle.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <h3 className="font-semibold">{angle.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-700">{angle.body}</p>
                          </div>
                        ))}
                      </div>
                    </Panel>

                    <Panel title="Weekly action checklist">
                      <ul className="space-y-2">
                        {plan.checklist.map((item) => (
                          <li key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700">
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
                      onCopy={() => copyText("Instagram caption", plan.instagramCaption)}
                    />
                    <CopyPanel
                      title="WhatsApp promo message"
                      text={plan.whatsappMessage}
                      copied={copied}
                      onCopy={() => copyText("WhatsApp promo message", plan.whatsappMessage)}
                    />
                    <CopyPanel
                      title="Starter ad copy"
                      text={plan.adStarter}
                      copied={copied}
                      onCopy={() => copyText("Starter ad copy", plan.adStarter)}
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
                    <Panel title="Enter test results">
                      <div className="grid gap-4 md:grid-cols-2">
                        <MetricField label="DMs / inquiries" value={dms} onChange={setDms} />
                        <MetricField label="Saves" value={saves} onChange={setSaves} />
                        <MetricField label="Comments" value={comments} onChange={setComments} />
                        <MetricField label="Pre-orders" value={preorders} onChange={setPreorders} />
                      </div>
                    </Panel>

                    <Panel title="Final recommendation">
                      <div className="rounded-2xl bg-slate-900 p-6 text-white">
                        <div className="text-sm uppercase tracking-wide text-slate-300">Decision</div>
                        <div className="mt-2 text-3xl font-bold">{decision.label}</div>
                        <p className="mt-3 leading-7 text-slate-100">{decision.reason}</p>
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
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
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
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
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

function MetricField({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type="number"
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
      <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">{children}</div>
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
      <div className={`text-sm ${dark ? "text-slate-300" : "text-slate-500"}`}>{title}</div>
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