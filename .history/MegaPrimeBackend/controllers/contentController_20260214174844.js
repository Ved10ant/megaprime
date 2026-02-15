const Content = require("../models/Content");

exports.getContent = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const content = await Content.findOne({ sectionId });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllContent = async (req, res) => {
  try {
    const contents = await Content.find().select("sectionId title");
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { title, content } = req.body;

    let existingContent = await Content.findOne({ sectionId });

    if (existingContent) {
      existingContent.title = title;
      existingContent.content = content;
      existingContent.lastUpdated = Date.now();
      await existingContent.save();
    } else {
      existingContent = new Content({
        sectionId,
        title,
        content,
      });
      await existingContent.save();
    }

    res.json(existingContent);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createInitialContent = async (req, res) => {
  try {
    const initialContent = [
      {
        sectionId: "hero",
        title: "Hero Section",
        content: {
          heading: "Welcome to MegaPrime Residency",
          subheading: "Luxury Living Redefined",
          description:
            "Experience premium luxury apartments with world-class amenities and strategic location.",
        },
      },
      {
        sectionId: "project-overview",
        title: "Project Overview",
        content: {
          title: "Project Overview",
          description:
            "MegaPrime Residency is a premium residential project offering luxurious 2BHK and 3BHK apartments with modern amenities and excellent connectivity.",
        },
      },
      {
        sectionId: "nearby-connectivity",
        title: "Nearby Connectivity",
        content: {
          title: "Nearby Connectivity",
          locations: [
            "Metro Station - 2 km",
            "Airport - 15 km",
            "Shopping Mall - 3 km",
            "Schools & Colleges - 1 km",
            "Hospital - 5 km",
          ],
        },
      },
      {
        sectionId: "amenities",
        title: "Amenities",
        content: {
          title: "World-Class Amenities",
          amenities: [
            {
              name: "Swimming Pool",
              description: "Olympic-size swimming pool for residents",
            },
            {
              name: "Gymnasium",
              description: "Fully equipped modern fitness center",
            },
            {
              name: "Club House",
              description: "Premium club house with recreational facilities",
            },
            {
              name: "Children's Play Area",
              description: "Safe and fun play area for kids",
            },
            {
              name: "Garden & Landscaping",
              description: "Beautifully landscaped gardens",
            },
            {
              name: "24/7 Security",
              description: "Round-the-clock security services",
            },
          ],
        },
      },
      {
        sectionId: "about-us",
        title: "About Us",
        content: {
          title: "About MegaPrime Developers",
          description:
            "We are a premier real estate development company committed to delivering excellence in luxury residential projects with sustainable and innovative solutions.",
        },
      },
      {
        sectionId: "construction-updates",
        title: "Construction Updates",
        content: {
          title: "Project Progress",
          phases: [
            { name: "Foundation Work", status: "Completed" },
            { name: "Structural Work", status: "In Progress" },
            { name: "Electrical & Plumbing", status: "Pending" },
            { name: "Interior Finishing", status: "Pending" },
            { name: "Landscaping", status: "Pending" },
          ],
        },
      },
      {
        sectionId: "faq",
        title: "Frequently Asked Questions",
        content: {
          title: "FAQ",
          questions: [
            {
              question: "What is the total project area?",
              answer: "The project spans across 10 acres of prime land.",
            },
            {
              question: "What are the apartment sizes available?",
              answer:
                "We offer 2BHK apartments (1200 sq.ft) and 3BHK apartments (1800 sq.ft).",
            },
            {
              question: "What is the expected possession date?",
              answer: "Expected possession date is December 2025.",
            },
            {
              question: "Are there any rental options available?",
              answer:
                "Yes, we offer flexible rental options for interested buyers.",
            },
          ],
        },
      },
    ];

    for (const contentItem of initialContent) {
      await Content.findOneAndUpdate(
        { sectionId: contentItem.sectionId },
        contentItem,
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Initial content created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
