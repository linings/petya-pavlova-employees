function findPairOfEmployeesWorkedTogetherTheLongest(employeesData) {

    let initialEmployeesData = convertTextDataToObject(employeesData);

    let days = 86400000;
    let pairOfEmployeesAndDaysTheyWorkedTogether = [];

    for (let i = 0; i < initialEmployeesData.length - 1; i++) {
        let formerEmployee = initialEmployeesData[i];

        for (let j = i + 1; j < initialEmployeesData.length; j++) {
            let nextEmployee = initialEmployeesData[j];

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
                        (p.employee1 === formerEmployee[0] && p.employee2 === nextEmployee[0])
                        || (p.employee1 === nextEmployee[0] && p.employee2 === formerEmployee[0])
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
    
    let employeesWorkedLongest = pairOfEmployeesAndDaysTheyWorkedTogether.sort((a,b) => a.days - b.days)[pairOfEmployeesAndDaysTheyWorkedTogether.length -1];

    return employeesWorkedLongest;
}

const convertTextDataToObject = (employeesData) => {
    return employeesData.split('\n').map(d => {
        return d.split(',').map(i => i.trim());
    })
}

export default findPairOfEmployeesWorkedTogetherTheLongest;