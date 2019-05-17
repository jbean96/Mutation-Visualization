const mutation_operators = {
    CRP : {
        short_name : 'CRP',
        full_name: 'Constant Replacement',
    },
    CDL : {
        short_name : 'CDL',
        full_name: 'Constant Deletion',
    },
    AOD : {
        short_name : 'AOD',
        full_name: 'Arithmetic Operator Deletion',
    },
    AOR : {
        short_name : 'AOR',
        full_name: 'Arithmetic Operator Replacement',
    },
    ASR : {
        short_name : 'ASR',
        full_name: 'Assignment Operator Replacement',
    },
    BOD : {
        short_name : 'BOD',
        full_name: 'Bitwise Operator Deletion',
    },
    BOR : {
        short_name : 'BOR',
        full_name: 'Bitwise Operator Replacement',
    },
    COR : {
        short_name: 'COR',
        full_name: 'Comparison Operator Replacement'
    },
    EXS : {
        short_name : 'EXS',
        full_name: 'Except Handler'
    },
    LOD : {
        short_name : 'LOD',
        full_name: 'Logical Operator Deletion',
    },
    LOI : {
        short_name : 'LOI',
        full_name: 'Logical Operator Insertion',
    },
    LCR : {
        short_name : 'LCR',
        full_name: 'Logical Connector Replacement',
    },
    ROR : {
        short_name : 'ROR',
        full_name: 'Relational Operator Replacement',
    },
    BCR : {
        short_name : 'BCR',
        full_name: ' Break Continue Replacement',
    },
    SMD : {
        short_name : 'SMD',
        full_name: 'Statement Deletion',
    },
    FHD : {
        short_name : 'FHD',
        full_name: 'Finally Handler Deletion',
    },
    EXD : {
        short_name : 'EXD',
        full_name: 'Exception Disabling',
    },
    OIL : {
        short_name : 'OIL',
        full_name: 'One Iteration Loop',
    },
    RIL : {
        short_name : 'RIL',
        full_name: 'Reverse Iteration Loop',
    },
    ZIL : {
        short_name : 'ZIL',
        full_name: 'Zero Iteration Loop',
    },
    SSID : {
        short_name : 'SSID',
        full_name: 'Slice Start Index Deletion',
    },
    SEID : {
        short_name : 'SEID',
        full_name: 'Slice End Index Deletion',
    },
    STID : {
        short_name : 'STID',
        full_name: 'Slice Step Index Deletion',
    },
    SVD : {
        short_name : 'SVD',
        full_name: 'Self Variable Deletion',
    }
};

module.exports = mutation_operators;