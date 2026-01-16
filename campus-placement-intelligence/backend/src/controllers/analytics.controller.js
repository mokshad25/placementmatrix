const Application = require("../models/Application");

/**
 * CGPA vs Selection Rate
 */
exports.getCgpaVsSelection = async (req, res, next) => {
  try {
    const result = await Application.aggregate([
      {
        $group: {
          _id: "$cgpaBucketAtApplication",
          total: { $sum: 1 },
          selected: {
            $sum: {
              $cond: [{ $eq: ["$outcome", "selected"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          cgpaBucket: "$_id",
          sampleSize: "$total",
          selectionRate: {
            $round: [
              { $multiply: [{ $divide: ["$selected", "$total"] }, 100] },
              2
            ]
          },
          _id: 0
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Skills Impact
 */
exports.getSkillsImpact = async (req, res, next) => {
  try {
    const result = await Application.aggregate([
      { $unwind: "$skillsAtApplication" },
      {
        $group: {
          _id: "$skillsAtApplication",
          total: { $sum: 1 },
          selected: {
            $sum: {
              $cond: [{ $eq: ["$outcome", "selected"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          skill: "$_id",
          sampleSize: "$total",
          selectionRate: {
            $round: [
              { $multiply: [{ $divide: ["$selected", "$total"] }, 100] },
              2
            ]
          },
          _id: 0
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Company-wise Trends
 */
exports.getCompanyTrends = async (req, res, next) => {
  try {
    const result = await Application.aggregate([
      {
        $group: {
          _id: "$companyId",
          total: { $sum: 1 },
          selected: {
            $sum: {
              $cond: [{ $eq: ["$outcome", "selected"] }, 1, 0]
            }
          }
        }
      },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "_id",
          as: "company"
        }
      },
      { $unwind: "$company" },
      {
        $project: {
          company: "$company.name",
          sampleSize: "$total",
          selectionRate: {
            $round: [
              { $multiply: [{ $divide: ["$selected", "$total"] }, 100] },
              2
            ]
          },
          _id: 0
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
