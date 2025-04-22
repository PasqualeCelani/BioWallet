import argparse
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

def plot_FRR_FAR(name):
    data = pd.read_csv(name+".csv")
    x = data["Threshold"]
    y1 = data["FAR"]
    y2 = data["FRR"]
    plt.grid(True)
    plt.plot(x,y1,label="FAR")
    plt.plot(x,y2,label="FRR")
    plt.title("Plot of FAR and FRR")
    plt.xlabel("Threshold")
    plt.ylabel("Error rate")
    plt.legend()
    plt.show()

def plot_ROC(name):
    data = pd.read_csv(name+".csv")
    x = data["FAR"].values
    print(x)
    y = [1-f for f in data["FRR"].values]
    plt.grid(True)
    plt.plot(x, y)
    plt.title("ROC curve")
    plt.xlabel("FAR")
    plt.ylabel("1-FRR")
    plt.show()

def plot_Quaility_distribution(name):
    data = pd.read_csv(name+".csv")
    plt.figure(figsize=(8, 5))
    sns.kdeplot(data['image'], fill=True, bw_adjust=0.2, clip=(0, 1))
    plt.title("Quality Measure Distribution")
    plt.xlabel("Quality Score (0 to 1)")
    plt.ylabel("Probability Density")
    plt.grid(True)
    plt.show()


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument("--type", type=str, required=True)
    parser.add_argument("--benchmark_file", type=str, required=True)

    args = parser.parse_args()

    type = args.type
    if not (type  in ["ROC", "FRR-FAR", "QualityDistribution"]):
        raise Exception("The type must be either ROC, FRR-FAR or QualityDistribution")
    
    benchmark_file = args.benchmark_file

    if(type == "ROC"):
        plot_ROC(benchmark_file)
    elif(type == "FRR-FAR"):
        plot_FRR_FAR(benchmark_file)
    else:
        plot_Quaility_distribution(benchmark_file)


if __name__ == "__main__":
    main()
