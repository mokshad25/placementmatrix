const Application = require("../models/Application");
const asyncHandler = require("../utils/asyncHandler");
const { getConfidenceLevel } = require("../utils/confidence");
const { getCache, setCache } = require("../utils/cache");

/**
 * Helper: Build consistent analytics response
 */
const buildResponse = (description, summary, data) => {
  return {
    success: true,
    meta: {
      description,
      summary,
      generatedAt: new Date().toISOString()
    },
    data
  };
};

/**
 * Helper: Generate simple insight summary
 */
const summarizeTopItem = (items, labelKey, valueKey) => {
  if (!items || items.length === 0) return null;

  const top = items.reduce((a, b) =>
    b[valueKey] > a[valueKey] ? b : a
  );

  return `Highest ${labelKey}: ${top[labelKey]} (${top[valueKey]}%)`;
};

/**
 * 📊 CGPA vs Selection Analytics
 */
const cgpaVsSelection = asyncHandler(async (req, res) => {
  const cacheKey = "cgpaVsSelection";
  const cached = getCache(cacheKey);
  if (cached) return res.status(200).json(cached);

  const result = await Application.aggregate([
    {
      $lookup: {
        from: "students",
        localField: "student",
        foreignField: "_id",
        as: "student"
      }
    },
    { $unwind: "$student" },
    {
      $group: {
        _id: "$student.cgpaBucket",
        sampleSize: { $sum: 1 },
        selectedCount: {
          $sum: {
            $cond: [{ $eq: ["$finalOutcome", "SELECTED"] }, 1, 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        cgpaBucket: "$_id",
        sampleSize: 1,
        selectionRate: {
          $cond: [
            { $eq: ["$sampleSize", 0] },
            0,
            {
              $round: [
                {
                  $multiply: [
                    { $divide: ["$selectedCount", "$sampleSize"] },
                    100
                  ]
                },
                2
              ]
            }
          ]
        }
      }
    }
  ]);

  if (!result || result.length === 0) {
    const emptyResponse = buildResponse(
      "CGPA bucket vs historical selection rate",
      "No sufficient data available",
      []
    );
    setCache(cacheKey, emptyResponse);
    return res.status(200).json(emptyResponse);
  }

  const enriched = result.map(r => ({
    ...r,
    confidence: getConfidenceLevel(r.sampleSize)
  }));

  const summary = summarizeTopItem(
    enriched,
    "cgpaBucket",
    "selectionRate"
  );

  const response = buildResponse(
    "CGPA bucket vs historical selection rate",
    summary,
    enriched
  );

  setCache(cacheKey, response);
  res.status(200).json(response);
});

/**
 * 📊 Skills Impact Analytics
 */
const skillsImpact = asyncHandler(async (req, res) => {
  const cacheKey = "skillsImpact";
  const cached = getCache(cacheKey);
  if (cached) return res.status(200).json(cached);

  const result = await Application.aggregate([
    {
      $lookup: {
        from: "students",
        localField: "student",
        foreignField: "_id",
        as: "student"
      }
    },
    { $unwind: "$student" },
    { $unwind: "$student.skills" },
    {
      $group: {
        _id: "$student.skills",
        sampleSize: { $sum: 1 },
        selectedCount: {
          $sum: {
            $cond: [{ $eq: ["$finalOutcome", "SELECTED"] }, 1, 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        skill: "$_id",
        sampleSize: 1,
        selectionRate: {
          $cond: [
            { $eq: ["$sampleSize", 0] },
            0,
            {
              $round: [
                {
                  $multiply: [
                    { $divide: ["$selectedCount", "$sampleSize"] },
                    100
                  ]
                },
                2
              ]
            }
          ]
        }
      }
    }
  ]);

  if (!result || result.length === 0) {
    const emptyResponse = buildResponse(
      "Skill vs historical selection rate",
      "No sufficient data available",
      []
    );
    setCache(cacheKey, emptyResponse);
    return res.status(200).json(emptyResponse);
  }

  const enriched = result.map(r => ({
    ...r,
    confidence: getConfidenceLevel(r.sampleSize)
  }));

  const summary = summarizeTopItem(
    enriched,
    "skill",
    "selectionRate"
  );

  const response = buildResponse(
    "Skill vs historical selection rate",
    summary,
    enriched
  );

  setCache(cacheKey, response);
  res.status(200).json(response);
});

/**
 * 📊 Company-wise Trends Analytics
 */
const companyTrends = asyncHandler(async (req, res) => {
  const cacheKey = "companyTrends";
  const cached = getCache(cacheKey);
  if (cached) return res.status(200).json(cached);

  const result = await Application.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company"
      }
    },
    { $unwind: "$company" },
    {
      $group: {
        _id: "$company.name",
        sampleSize: { $sum: 1 },
        selectedCount: {
          $sum: {
            $cond: [{ $eq: ["$finalOutcome", "SELECTED"] }, 1, 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        company: "$_id",
        sampleSize: 1,
        selectionRate: {
          $cond: [
            { $eq: ["$sampleSize", 0] },
            0,
            {
              $round: [
                {
                  $multiply: [
                    { $divide: ["$selectedCount", "$sampleSize"] },
                    100
                  ]
                },
                2
              ]
            }
          ]
        }
      }
    }
  ]);

  if (!result || result.length === 0) {
    const emptyResponse = buildResponse(
      "Company-wise historical selection rate",
      "No sufficient data available",
      []
    );
    setCache(cacheKey, emptyResponse);
    return res.status(200).json(emptyResponse);
  }

  const enriched = result.map(r => ({
    ...r,
    confidence: getConfidenceLevel(r.sampleSize)
  }));

  const summary = summarizeTopItem(
    enriched,
    "company",
    "selectionRate"
  );

  const response = buildResponse(
    "Company-wise historical selection rate",
    summary,
    enriched
  );

  setCache(cacheKey, response);
  res.status(200).json(response);
});

module.exports = {
  cgpaVsSelection,
  skillsImpact,
  companyTrends
};
