const IpBlockModel = require("../models/ip-blocks.model");
const CountryBlockModel = require("../models/country-blocks.model");

exports.updateIps = async (req, res) => {
  try {
    const user = req.user;
    const ips = req.body.ips;
    const ipblocks = await IpBlockModel.findOne({ $where: { user: user.id } });

    if (!ipblocks) {
      const newBlocks = new IpBlockModel({
        user: user.id,
        data: ips
      });
      await newBlocks.save();
    } else {
      await IpBlockModel.findOneAndUpdate(
        { $where: { user: user.id } },
        { data: ips }
      );
    }
    return res.status(201).json({ message: "Successfully Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateCountries = async (req, res) => {
    try {
        const user = request.user;
        const country = req.body.country;
        const countryBlockedRecord = await CountryBlockModel.findOne({ $where: { user: user.id }});

        if (!countryBlockedRecord) {
            const newBlockedCountries = new CountryBlockModel({
                user: user.id,
                data: country
            })
            await newBlockedCountries.save()
        } else {
            await CountryBlockModel.findOneAndUpdate({ $where: { user: user.id }}, { data: country })
        }
        return res.status(201).json({ message: "Successfully Updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  
};
