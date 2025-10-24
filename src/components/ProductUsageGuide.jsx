import React, { useState } from 'react'
import { BookOpen, Clock, Droplets, Hand, Sparkles, AlertCircle, CheckCircle } from 'lucide-react'

function ProductUsageGuide({ product }) {
  const [activeTab, setActiveTab] = useState('usage')

  const usageInstructions = {
    'skin-care': {
      title: "Skin Care Powder Usage",
      steps: [
        {
          icon: <Droplets size={20} />,
          title: "Mix the Powder",
          description: "Take 1-2 tablespoons of powder in a bowl. Add water, rose water, or milk to make a smooth paste."
        },
        {
          icon: <Hand size={20} />,
          title: "Apply Gently",
          description: "Apply the paste evenly on clean, damp skin. Use gentle circular motions for 2-3 minutes."
        },
        {
          icon: <Clock size={20} />,
          title: "Let it Work",
          description: "Leave the paste on for 10-15 minutes. For deep cleansing, you can leave it for up to 20 minutes."
        },
        {
          icon: <Droplets size={20} />,
          title: "Rinse Thoroughly",
          description: "Rinse with lukewarm water using gentle circular motions. Pat dry with a soft towel."
        }
      ],
      frequency: "Use 2-3 times per week for best results",
      tips: [
        "Always do a patch test before first use",
        "Store in a cool, dry place",
        "Use within 6 months of opening",
        "Avoid contact with eyes"
      ]
    },
    'hair-care': {
      title: "Hair Care Powder Usage",
      steps: [
        {
          icon: <Droplets size={20} />,
          title: "Prepare the Mix",
          description: "Mix 2-3 tablespoons of powder with water or coconut oil to make a thick paste."
        },
        {
          icon: <Hand size={20} />,
          title: "Apply to Scalp",
          description: "Apply the paste to wet hair, focusing on scalp and roots. Massage gently for 5-10 minutes."
        },
        {
          icon: <Clock size={20} />,
          title: "Leave to Work",
          description: "Leave the paste on for 30-45 minutes. Cover with a shower cap for better absorption."
        },
        {
          icon: <Droplets size={20} />,
          title: "Rinse Well",
          description: "Rinse thoroughly with water. You may need to rinse twice to remove all powder."
        }
      ],
      frequency: "Use once or twice per week",
      tips: [
        "Wet hair before application",
        "Use a wide-tooth comb to distribute evenly",
        "Follow with a mild conditioner",
        "Avoid getting in eyes"
      ]
    },
    'oral-care': {
      title: "Tooth Powder Usage",
      steps: [
        {
          icon: <Hand size={20} />,
          title: "Wet Your Brush",
          description: "Wet your toothbrush and dip it into the powder. A small amount is sufficient."
        },
        {
          icon: <Hand size={20} />,
          title: "Brush Gently",
          description: "Brush your teeth gently in circular motions for 2-3 minutes, covering all surfaces."
        },
        {
          icon: <Droplets size={20} />,
          title: "Rinse Mouth",
          description: "Rinse your mouth thoroughly with water to remove all powder residue."
        },
        {
          icon: <CheckCircle size={20} />,
          title: "Follow Routine",
          description: "Use twice daily, morning and evening, for optimal oral health benefits."
        }
      ],
      frequency: "Use twice daily",
      tips: [
        "Use a soft-bristled toothbrush",
        "Don't swallow the powder",
        "Store in a dry place",
        "Replace every 3 months"
      ]
    }
  }

  const currentGuide = usageInstructions[product.category] || usageInstructions['skin-care']

  const benefits = {
    'skin-care': [
      "Natural exfoliation removes dead skin cells",
      "Antibacterial properties fight acne",
      "Anti-inflammatory ingredients soothe irritation",
      "Natural oils provide deep moisturization"
    ],
    'hair-care': [
      "Strengthens hair from roots to tips",
      "Natural ingredients promote hair growth",
      "Removes excess oil and buildup",
      "Adds natural shine and volume"
    ],
    'oral-care': [
      "Natural whitening without chemicals",
      "Antibacterial properties fight germs",
      "Freshens breath naturally",
      "Strengthens gums and teeth"
    ]
  }

  const currentBenefits = benefits[product.category] || benefits['skin-care']

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#2d5f3f] to-[#1e4a2f] text-white p-4">
        <div className="flex items-center gap-3">
          <BookOpen size={24} />
          <div>
            <h3 className="font-bold text-lg">Usage Guide</h3>
            <p className="text-sm text-white/80">How to use {product.name} effectively</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'usage'
                ? 'bg-[#2d5f3f] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            How to Use
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'benefits'
                ? 'bg-[#2d5f3f] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Benefits
          </button>
        </div>

        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div className="space-y-4">
              {currentGuide.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#2d5f3f] text-white rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-amber-600" />
                <span className="font-semibold text-amber-800">Frequency</span>
              </div>
              <p className="text-amber-700 text-sm">{currentGuide.frequency}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={18} className="text-blue-600" />
                <span className="font-semibold text-blue-800">Important Tips</span>
              </div>
              <ul className="space-y-1">
                {currentGuide.tips.map((tip, index) => (
                  <li key={index} className="text-blue-700 text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Sparkles size={32} className="text-[#2d5f3f] mx-auto mb-2" />
              <h4 className="font-bold text-lg text-gray-900">Natural Benefits</h4>
              <p className="text-gray-600 text-sm">What makes {product.name} special</p>
            </div>

            <div className="grid gap-3">
              {currentBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#2d5f3f] to-[#1e4a2f] text-white rounded-lg p-4">
              <h5 className="font-semibold mb-2">Why Choose Natural?</h5>
              <p className="text-sm text-white/90">
                Our traditional Ayurvedic powders are made with time-tested ingredients that have been used for centuries. 
                No chemicals, no side effects, just pure natural goodness for your skin, hair, and oral health.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductUsageGuide

