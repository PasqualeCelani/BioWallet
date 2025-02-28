import argparse
from random import choice
import utils


def ImpostorGenuineSetup(matrix):
    number_impostors = 0
    number_genuine = 0
    claims = []
    for i in range(1, len(matrix)):
        identity = matrix[i][0].split("_")[0]
        impostor = choice([True, False])
        claim = identity
        if impostor:
            identities = {matrix[0][i].split("_")[0] for i in range(1, len(matrix[0])) if matrix[0][i].split("_")[0] != identity}
            claim = choice(list(identities))
            number_impostors += 1
        else:
            number_genuine += 1
        headers = [i for i in range(1, len(matrix[0])) if matrix[0][i].split("_")[0] == claim]
        max_similarity = -1
        for j in headers:
            similarity = float(matrix[i][j])
            if similarity > max_similarity:
                max_similarity = similarity
        claims.append([impostor, max_similarity])
    return {'impostors':number_impostors, 'genuine':number_genuine, 'claims':claims}

def benchmark(similarity_matrix_name, result_name):
    matrix = utils.read_from_csv("./SimilarityMatrixes/"+similarity_matrix_name)
    setup = ImpostorGenuineSetup(matrix)
    number_impostors = setup["impostors"]
    number_genuine = setup["genuine"]
    t = 0.0
    result = [["Threshold", "FAR", "FRR"]]
    while t <= 1.0:
        fa, fr = 0,0
        for claim in setup["claims"]:
            max_similarity = round(claim[1],3)
            impostor = claim[0]
            if t <= max_similarity and impostor:
                fa+=1
            if t > max_similarity and not impostor:
                fr+=1
        result.append([t, fa/number_impostors, fr/number_genuine])
        t  = round(t+0.005,3)
    utils.save_to_csv("./BenchmarkResult/"+result_name, result)

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument("--similarity_matrix_name", type=str, required=True)
    parser.add_argument("--output_file_name", type=str, required=True)

    args = parser.parse_args()

    similarity_matrix_name = args.similarity_matrix_name
    output_file_name = args.output_file_name

    benchmark(similarity_matrix_name, output_file_name)

if __name__ == "__main__":
    main()