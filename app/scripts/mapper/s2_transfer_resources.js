define(["mapper/s2_base_resource"], function(BaseResource) {
  "use strict";

  var transferModels = _.chain({
    "transfer_plates_to_plates": function(details) {
      return {
        amount:          details.amount,
        aliquot_type:    details.aliquot_type,
        source_uuid:     details.input.resource.uuid,
        source_location: details.source_location,
        target_uuid:     details.output.resource.uuid,
        target_location: details.target_location
      };
    },

    "transfer_tubes_to_tubes": function(details) {
      return {
        fraction:     details.fraction,
        aliquot_type: details.aliquot_type,
        source_uuid:  details.input.resource.uuid,
        target_uuid:  details.output.resource.uuid
      };
    },

    "transfer_wells_to_tubes": function(details) {
      return {
        fraction:        details.fraction,
        aliquot_type:    details.aliquot_type,
        source_uuid:     details.input.resource.uuid,
        source_location: details.input.location,
        target_uuid:     details.output.resource.uuid
      };
    }
  }).pairs().map(function(pair) {
    return $.extend(BaseResource.extendAs(pair[0], function(transferInstance) {
      return transferInstance;
    }), {
      extract: function(transfers) {
        return { transfers: _.map(transfers, pair[1]) };
      }
    });
  });

  return {
    register: function(register) {
      transferModels.each(function(model) {
        model.register(register);
      }).value();
    }
  };
});
