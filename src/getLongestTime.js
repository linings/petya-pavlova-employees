function findPairOfEmployeesWorkedTogetherTheLongest(employeesData) {

    let initialEmployeesData = convertTextDataToObject(employeesData);

    console.log(initialEmployeesData);

    let days = 86400000;
    let pairOfEmployeesAndDaysTheyWorkedTogether = [];

    for (let i = 0; i < initialEmployeesData.length - 1; i++) {
        let formerEmployee = initialEmployeesData[i];
        formerEmployee[0] = formerEmployee[0].trim();

        for (let j = i + 1; j < initialEmployeesData.length; j++) {
            let nextEmployee = initialEmployeesData[j];
            nextEmployee[0] = nextEmployee[0].trim();

            if (formerEmployee[0] !== nextEmployee[0] && formerEmployee[1] === nextEmployee[1]) {

                let formerEmployeeDateFrom = new Date(formerEmployee[2]);
                let formerEmployeeDateTo = formerEmployee[3] === "NULL" ? new Date(new Date().toString()) : new Date(formerEmployee[3]);
                let nextEmployeeDateFrom = new Date(nextEmployee[2]);
                let nextEmployeeDateTo = nextEmployee[3] === "NULL" ? new Date(new Date().toLocaleDateString()) : new Date(nextEmployee[3]);

                if (formerEmployeeDateFrom <= nextEmployeeDateTo && nextEmployeeDateFrom <= formerEmployeeDateTo) {
                    let fromDate =
                        formerEmployeeDateFrom >= nextEmployeeDateFrom
                            ? formerEmployeeDateFrom
                            : nextEmployeeDateFrom;

                    let toDate =
                        formerEmployeeDateTo <= nextEmployeeDateTo
                            ? formerEmployeeDateTo
                            : nextEmployeeDateTo;

                    let daysWorkerdTogether = ((toDate - fromDate) / days).toFixed(0);
                    daysWorkerdTogether = Number(daysWorkerdTogether);

                    if (pairOfEmployeesAndDaysTheyWorkedTogether.length === 0) {
                        pairOfEmployeesAndDaysTheyWorkedTogether.push({
                            employee1: formerEmployee[0],
                            employee2: nextEmployee[0],
                            days: daysWorkerdTogether,
                            projectId: formerEmployee[1]
                        });
                        continue;
                    }

                    let currentPair = pairOfEmployeesAndDaysTheyWorkedTogether.find(p =>
                        p.employee1 === formerEmployee[0] && p.employee2 === nextEmployee[0]
                        || p.employee1 === nextEmployee[0] && p.employee2 === formerEmployee[0]
                    );

                    if (currentPair) {
                        if (daysWorkerdTogether > currentPair.days) {
                            currentPair.days = daysWorkerdTogether;
                            currentPair.projectId = nextEmployee[1];
                        }
                    } else {
                        pairOfEmployeesAndDaysTheyWorkedTogether.push({
                            employee1: formerEmployee[0],
                            employee2: nextEmployee[0],
                            days: daysWorkerdTogether,
                            projectId: formerEmployee[1]
                        });
                    }
                }
            }
        }
    }
    console.log(pairOfEmployeesAndDaysTheyWorkedTogether);
    let pairEmployeerWorkedLongestTogether =
        Math.max.apply(Math, pairOfEmployeesAndDaysTheyWorkedTogether.map((p) => {
            return p.days;
        }));

    console.log(pairEmployeerWorkedLongestTogether);
    // return pairEmployeerWorkedLongestTogether;
}

const convertTextDataToObject = (employeesData) => {
    return employeesData.split('\n').map(d => {
        return d.split(', ');
    })
}

export default findPairOfEmployeesWorkedTogetherTheLongest;